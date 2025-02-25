import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Trending.module.css";
import LHeader from "../components/LHeader";
import ProfileModal from "../components/ProfileModal";

export default function Trending() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/trending")
      .then((res) => {
        setTrendingRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trending recipes:", err.response?.data || err.message);
        setError("Failed to load trending recipes.");
        setLoading(false);
      });
  }, []);

  const increaseLikes = (index) => {
    setTrendingRecipes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], likes: updated[index].likes + 1 };
      return updated;
    });
  };

  return (
    <>
      <LHeader setShowProfileModal={setShowProfileModal} />
      <main className={styles.main}>
        <h1 className={styles.title}>Trending Recipes</h1>
        <p className={styles.welcome}>Welcome back, {username}!</p>
        {loading ? (
          <div className={styles.loading}>Loading trending recipes...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : trendingRecipes.length === 0 ? (
          <div className={styles.empty}>No trending recipes available.</div>
        ) : (
          <div className={styles.recipeGrid}>
            {trendingRecipes.map((recipe, index) => (
              <div key={recipe.id} className={styles.recipeCard}>
                <div className={styles.imageWrapper}>
                  <img src={recipe.image} alt={recipe.title} className={styles.cardImage} />
                  <span className={styles.rank}>#{index + 1}</span>
                </div>
                <div className={styles.cardContent}>
                  <h3>{recipe.title}</h3>
                  <p className={styles.time}>⏳ {recipe.time}</p>
                  <p className={styles.score}>Trend Score: {recipe.trendScore}%</p>
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.likeButton}
                      onClick={() => increaseLikes(index)}
                    >
                      ❤️ {recipe.likes}
                    </button>
                    <Link to={`/recipe/${recipe.id}`} className={styles.viewButton}>View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
}