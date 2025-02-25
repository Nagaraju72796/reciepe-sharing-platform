import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Saved.module.css";
import LHeader from "../components/LHeader";

export default function Saved() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "guest";
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/saved/${userId}`)
      .then((res) => {
        setLikedRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching saved recipes:", err.response?.data || err.message);
        setError("Failed to load saved recipes.");
        setLoading(false);
      });
  }, [userId]);

  const increaseLikes = (index) => {
    setLikedRecipes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], likes: updated[index].likes + 1 };
      return updated;
    });
  };

  const removeRecipe = (index) => {
    setLikedRecipes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <LHeader />
      <main className={styles.main}>
        <h1 className={styles.title}>Saved Recipes</h1>
        {loading ? (
          <div className={styles.loading}>Loading saved recipes...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : likedRecipes.length === 0 ? (
          <div className={styles.empty}>
            <p>No saved recipes yet.</p>
            <Link to="/home" className={styles.exploreButton}>Explore Recipes</Link>
          </div>
        ) : (
          <div className={styles.recipeGrid}>
            {likedRecipes.map((recipe, index) => (
              <div key={recipe.id} className={styles.recipeCard}>
                <img src={recipe.image} alt={recipe.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3>{recipe.title}</h3>
                  <p className={styles.time}>⏳ {recipe.time}</p>
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.likeButton}
                      onClick={() => increaseLikes(index)}
                    >
                      ❤️ {recipe.likes}
                    </button>
                    <div>
                      <Link to={`/recipe/${recipe.id}`} className={styles.viewButton}>View</Link>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeRecipe(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}