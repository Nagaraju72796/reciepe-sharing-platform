import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NotLHome.module.css";
import NotLHeader from "../components/NotLHeader";
import dishesData from "../data/dishes.json";

export default function NotLHome() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState(dishesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/dishes")
      .then((res) => {
        setDishes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dishes:", err.response?.data || err.message);
        setError("Failed to load dishes.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NotLHeader />
      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>Loading dishes...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          ["All Time Best", "Today Specials"].map((title, idx) => (
            <section key={idx} className={styles.recipeSection}>
              <h2>{title}</h2>
              <div className={styles.recipeGrid}>
                {dishes[Object.keys(dishes)[idx]].map((dish, index) => (
                  <div
                    key={index}
                    className={styles.recipeCard}
                    onClick={() => navigate(`/recipe/${index + 1}`)}
                  >
                    <img src={dish.image} alt={dish.title} className={styles.cardImage} />
                    <div className={styles.cardContent}>
                      <h3>{dish.title}</h3>
                      <p className={styles.time}>⏳ {dish.time}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.likes}>{dish.likes} Likes</span>
                        <button className={styles.likeButton} disabled>❤️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </>
  );
}