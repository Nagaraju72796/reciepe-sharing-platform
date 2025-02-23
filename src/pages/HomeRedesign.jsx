import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeRedesign.module.css';

export default function HomeRedesign() {
  const initialDishes = Array(6).fill({
    title: 'Chick Gravy',
    time: '45 mins',
    likes: 123,
    image: '/dish2.jpg',
  });

  const [dishes, setDishes] = useState({
    inProgress: initialDishes,
    allTimeBest: initialDishes,
    trending: initialDishes,
    todaySpecials: initialDishes,
  });

  const increaseLikes = (section, index) => {
    const updatedSection = [...dishes[section]];
    updatedSection[index].likes += 1;
    setDishes({ ...dishes, [section]: updatedSection });
  };

  const tags = [
    'Chinese', 'Morning Foods', 'Italian Cuisine', 'Desserts', 'Healthy Snacks',
    'Vegan', 'Gluten-Free', 'Quick Meals', 'Beverages', 'Appetizers', 'Main Course',
  ];

  const renderSection = (title, sectionKey) => (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>
        {dishes[sectionKey].map((dish, index) => (
          <div className={styles.card} key={index}>
            <img src={dish.image} alt={dish.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{dish.title}</h3>
              <span className={styles.cardTime}>🕒 {dish.time}</span>
              <div className={styles.likeContainer}>
                <span className={styles.likeCount}>{dish.likes}</span>
                <button
                  className={styles.likeButton}
                  onClick={() => increaseLikes(sectionKey, index)}
                >
                  👍 Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/recipe-logo.jpg" alt="logo" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <Link to="/home" className={styles.navLink}>Home</Link>
          <Link to="/trending" className={styles.navLink}>Trending</Link>
          <Link to="/saved" className={styles.navLink}>Saved</Link>
          <Link to="/published" className={styles.navLink}>Published</Link>
        </nav>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search recipes..."
            className={styles.searchInput}
          />
          <img src="/search.svg" alt="search" className={styles.searchIcon} />
        </div>
        <img src="/profile_dp.jpg" alt="user" className={styles.profilePic} />
      </header>

      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <button key={index} className={styles.tagButton}>
            {tag}
          </button>
        ))}
      </div>

      <main className={styles.main}>
        {renderSection('In Progress', 'inProgress')}
        {renderSection('All Time Best', 'allTimeBest')}
        {renderSection('Trending', 'trending')}
        {renderSection('Today Specials', 'todaySpecials')}
      </main>
    </div>
  );
}