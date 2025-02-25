import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Recipe.module.css";
import NotLHeader from "../components/NotLHeader";
import LHeader from "../components/LHeader";

export default function Recipe({ isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err.response?.data || err.message);
        setError("Failed to load recipe.");
        setLoading(false);
      });
  }, [id]);

  const increaseLikes = () => {
    if (isLoggedIn) {
      setRecipe((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const saveRecipe = () => {
    const userId = localStorage.getItem("userId");
    if (isLoggedIn && userId) {
      axios
        .post(`http://localhost:5000/api/saved/${userId}`, { recipeId: Number(id) })
        .then(() => alert("Recipe saved!"))
        .catch((err) => console.error("Error saving recipe:", err));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <>
      {isLoggedIn ? <LHeader /> : <NotLHeader />}
      <main className={styles.recipeContainer}>
        <div className={styles.recipeHeader}>
          <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
          <div className={styles.recipeInfo}>
            <h1>{recipe.title}</h1>
            <p>By: <strong>{recipe.author}</strong></p>
            <div className={styles.recipeActions}>
              <span>❤️ {recipe.likes} Likes</span>
              <button
                onClick={increaseLikes}
                disabled={!isLoggedIn}
                className={styles.actionButton}
              >
                Like
              </button>
              {isLoggedIn && (
                <button onClick={saveRecipe} className={styles.actionButton}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.recipeContent}>
          <section className={styles.ingredients}>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
          <section className={styles.steps}>
            <h2>Steps</h2>
            <ol>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
        <Link to={isLoggedIn ? "/home" : "/"} className={styles.backButton}>
          Back to Home
        </Link>
      </main>
    </>
  );
}