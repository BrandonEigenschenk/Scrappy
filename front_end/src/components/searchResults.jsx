import React from "react";
import "./styles.css";

export const SearchResults = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <div key={id}>{result.job_title}</div>;
      })}
    </div>
  );
};
