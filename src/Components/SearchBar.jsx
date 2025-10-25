import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_API_KEY;

function SearchBar({ foodData, setFoodData }) {
  const [search, setSearch] = useState("pizza");

  useEffect(() => {
    async function fetchFood() {
      const respond = await fetch(`${URL}?query=${search}&apiKey=${API_KEY}`);
      const data = await respond.json();
      setFoodData(data.results);
    }
    fetchFood();
  }, [search]);

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      ></input>
    </div>
  );
}

export default SearchBar;
