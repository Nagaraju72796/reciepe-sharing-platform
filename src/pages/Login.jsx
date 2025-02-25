import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import NotLHeader from "../components/NotLHeader";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);
      setIsLoggedIn(true);
      navigate("/home", {
        state: { userId: res.data.userId, username: res.data.username, email: res.data.email }
      });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <NotLHeader />
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.leftPanel}>
            <h1 className={styles.welcomeText}>Welcome to Recipe Book</h1>
          </div>
          <div className={styles.rightPanel}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton}>Login</button>
              <p className={styles.linkText}>
                Don’t have an account? <Link to="/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}