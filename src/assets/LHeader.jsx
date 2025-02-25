import { Link, useNavigate } from "react-router-dom";
import styles from "./LHeader.module.css";

export default function LHeader({ setShowProfileModal }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img
        src="/recipe-logo.jpg"
        alt="Recipe Book"
        className={styles.logo}
        onClick={() => navigate("/home")}
      />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/home">Home</Link></li>
          <li className={styles.navItem}><Link to="/trending">Trending</Link></li>
          <li className={styles.navItem}><Link to="/saved">Saved</Link></li>
          <li className={styles.navItem}><Link to="/published">Published</Link></li>
        </ul>
      </nav>
      <div className={styles.headerRight}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Recipes..."
            className={styles.searchInput}
          />
          <img src="/search.svg" alt="Search" className={styles.searchIcon} />
        </div>
        <img
          src="/profile_dp.jpg"
          alt="Profile"
          className={styles.profilePic}
          onClick={() => setShowProfileModal?.(true)}
        />
      </div>
    </header>
  );
}