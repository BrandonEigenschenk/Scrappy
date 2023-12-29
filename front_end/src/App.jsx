import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [jobs, setJobs] = useState([]);

  function jobsAsLIs() {
    return jobs.map((job) => (
      <li key={job._id}>
        <strong>{job.job_title}</strong> - <a href = {job.URL}>{job.Source}</a>
      </li>
    ));
  }

  function getJobs() {
    fetch("http://localhost:5000/getData")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="App">
      <h1>List of jobs</h1>
      <ul>{jobsAsLIs()}</ul>
      <button onClick={getJobs}>Update Jobs</button>
    </div>
  );
}
