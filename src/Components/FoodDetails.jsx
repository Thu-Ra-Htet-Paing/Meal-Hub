import React, { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import IngredientList from "./IngredientList";

function FoodDetails({ foodId }) {
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchFood() {
      const respond = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await respond.json();
      setRecipe(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <img className={styles.image} src={recipe.image} alt="Food Pic"></img>

        <div className={styles.details}>
          <span>
            <strong>⏱️{recipe.readyInMinutes} minutes</strong>
          </span>

          <span>
            <strong>Serves {recipe.servings}👪</strong>
          </span>

          <span>
            <strong>
              {recipe.vegetarian ? "🍅 Vegetarian" : "🍖 Non-Vegetarian"}
            </strong>
          </span>

          <span>
            <strong>{recipe.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>

        <div>
          <span>
            <strong>
              💲{(recipe.pricePerServing / 100).toFixed(2)} Per Serving
            </strong>
          </span>
        </div>

        <h2>Ingredients</h2>
        {isLoading ? (
          <p className={styles.p}>Loading...</p>
        ) : (
          <IngredientList recipe={recipe} />
        )}

        <h2>Instructions</h2>
        <div className={styles.instructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
