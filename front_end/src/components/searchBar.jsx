import React, {useEffect, useState} from "react";
import "./styles.css"
import { FaSearch } from "react-icons/fa";


export const SearchBar = ({setResults}) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        initData();
    }, []);

    const initData = () => {
        fetch("http://localhost:5000/getData")
          .then((res) => res.json())
          .then((json) => {
            const results = json;
            setResults(results)
            console.log(results)
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
      
    const fetchData = (value) => {
        fetch("http://localhost:5000/getData")
          .then((res) => res.json())
          .then((json) => {
            const results = json.filter((user) => {
              return (
              user &&
              !value ||
              user.job_title &&
              user.job_title.toLowerCase().includes(value.toLowerCase())
            )
        });
            // Now you can use the 'results' array for further processing
            setResults(results)
            console.log(results)
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
      

    const handleChange = (value) => {
        setQuery(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id = "search-icon" />
            <input 
            placeholder="Type to Search..." 
            value = {query}
            onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};