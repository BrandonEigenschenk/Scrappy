import React, { useState } from "react";
import { SearchBar } from "./components/searchBar";
import "./App.css";
import { SearchResults } from "./components/searchResults";

export default function App() {
  const [jobs, setJobs] = useState([]);

  const [results, setResults] = useState([])

  return (
    <>
    <div className="search-bar-container">
      <SearchBar setResults = {setResults}></SearchBar>
      <SearchResults results = {results}/>
    </div>
    </>
  );
}
