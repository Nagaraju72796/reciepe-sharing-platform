import { Link, useNavigate } from "react-router-dom";
import styles from "./NotLHeader.module.css";

export default function NotLHeader() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img
        src="/recipe-logo.jpg"
        alt="Recipe Book"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <div className={styles.headerRight}>
        <Link to="/login">
          <button className={styles.authButton}>Login</button>
        </Link>
        <Link to="/register">
          <button className={styles.authButton}>Register</button>
        </Link>
      </div>
    </header>
  );
}