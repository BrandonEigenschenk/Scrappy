import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [jobs, setJobs] = useState([]);

  function jobsAsLIs() {
    return jobs.map((job) => (
      <tr key={job._id}>
        <td> {job.job_title}</td>
        <td> 
          <a href = {job.URL}>{job.URL}</a>
        </td>
        <td> {job.Source}</td>
        {/* <strong>{job.job_title}</strong> - <a href = {job.URL}>{job.Source}</a> */}
      </tr>
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
      <table>
        <tbody>
          <tr>
            <th>Job Title</th>
            <th>URL</th>
            <th>Source</th>
          </tr>
          {jobsAsLIs(getJobs())}
        </tbody>
      </table>
    </div>
  );
}
