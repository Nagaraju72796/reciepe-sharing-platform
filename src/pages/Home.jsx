import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import LHeader from "../components/LHeader";
import dishesData from "../data/dishes.json";

export default function Home() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState(dishesData);
  const tags = [
    "Chinese", "Morning Foods", "Italian Cuisine", "Desserts", "Healthy Snacks",
    "Vegan", "Gluten-Free", "Quick Meals", "Beverages", "Appetizers", "Main Course"
  ];

  const increaseLikes = (section, index) => {
    const updatedSection = [...dishes[section]];
    updatedSection[index].likes += 1;
    setDishes({ ...dishes, [section]: updatedSection });
  };

  return (
    <>
      <LHeader />
      <main className={styles.main}>
        <section className={styles.tagsSection}>
          <ul className={styles.tagList}>
            {tags.map((tag, index) => (
              <li key={index}>
                <button className={styles.tagButton}>{tag}</button>
              </li>
            ))}
          </ul>
        </section>

        {["In Progress", "All Time Best", "Trending", "Today Specials"].map((title, idx) => (
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
                      <button
                        className={styles.likeButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseLikes(Object.keys(dishes)[idx], index);
                        }}
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}