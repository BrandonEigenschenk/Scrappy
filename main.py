from scrapeLinkedin import *

def getKeyWord() -> str:
    return input("Enter search string: ").strip().replace(" ", "%20")

def resultLength() -> int:
    while(1):
        length = input("Enter max results (no more than 100\query): ")
        if(length.isdigit() and int(length) <= 100):
            return int(length)
        else: print("Error!")


def main():
    keyword = getKeyWord()
    search_len = resultLength()

    buildLinkedinList(keyword, search_len)

if __name__ == "__main__":
    main()