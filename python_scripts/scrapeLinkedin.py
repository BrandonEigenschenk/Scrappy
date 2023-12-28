from bs4 import BeautifulSoup
from dotenv import load_dotenv
import math
import os
import pandas as pd
import pymongo
import requests

load_dotenv()

myclient = pymongo.MongoClient(os.getenv("MONGO_DB"))
mydb = myclient[os.getenv("CLIENT")]
mycol = mydb[os.getenv("COLLECTION")]

def getDBList() -> list:
    temp_list = []

    x = mycol.find({})
    for element in x:
        temp_list.append(element["job id"])

    return temp_list

def buildLinkedinList(keyword:str, max_jobs: int) -> None:
    job_url = "https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{}"
    GEO_ID = "&geoId=103743442&location=Houston%2C%20Texas%2C%20United%20States"
    id_list = []
    # max_jobs = 100
    temp = {}
    posting_list = []
    target_url="https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords="+ keyword + GEO_ID + "&start={}"

    existing_id_list = getDBList()

    for i in range(0,math.ceil(max_jobs/25)):
        res = requests.get(target_url.format(i))
        soup=BeautifulSoup(res.text,'html.parser')
        alljobs_on_this_page=soup.find_all("li")[:max_jobs:]

        for x in range(0,len(alljobs_on_this_page)):
            jobid = alljobs_on_this_page[x].find("div",{"class":"base-card"}).get('data-entity-urn').split(":")[3]
            id_list.append(jobid)

    for i in range(0, len(id_list)):
        response = requests.get(job_url.format(id_list[i]))
        soup = BeautifulSoup(response.text, "html.parser")

        if(id_list[i] not in existing_id_list):
        
            temp["job id"] = id_list[i]

            try:
                temp["company"]=soup.find("div",{"class":"top-card-layout__card"}).find("a").find("img").get('alt')
            except:
                continue

            try:
                temp["job_title"] = soup.find("div",{"class": "top-card-layout__entity-info-container"}).find("div", class_ = "top-card-layout__entity-info").find("a").find("h2", class_ = "top-card-layout__title").text.strip()
            except:
                continue

            try:
                temp["level"] = soup.find("ul",{"class":"description__job-criteria-list"}).find("li").text.replace("Seniority level","").strip()
            except:
                continue

            temp["URL"] = job_url.format(id_list[i])
            temp["Source"] = "LinkedIn"

            posting_list.append(temp)
            temp = {}
    
    x = mycol.insert_many(posting_list)

    print(x.inserted_ids)
