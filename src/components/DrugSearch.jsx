import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DrugSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSearch = async () => {
    if (!query) {
      return;
    }
    try {
        const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
        nav(`/drugs/${query}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("catch block")
          const sugRes = await axios.get(
            `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${query}`
          );
          setSuggestion(sugRes.data.suggestionGroup?.suggestionList?.suggestion || []);
        } else {
          setError("Error fetching data. Please try again.");
        }
      }
      
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a drug"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button onClick={handleSearch}>🔎</button>
      {error && <div> {error}</div>}
      {suggestion.length > 0 && (
        <ul>
          {suggestion.map((sugg, ind) => (
            <li key={ind} onClick={() => setQuery(sugg)}>
              {sugg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugSearch;
