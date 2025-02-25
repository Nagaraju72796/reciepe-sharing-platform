import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";
import NotLHeader from "../components/NotLHeader";

export default function Register({ setIsLoggedIn }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/register", { fullName, email, password });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <NotLHeader />
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.leftPanel}>
            <h1 className={styles.welcomeText}>Welcome to Recipe Book</h1>
          </div>
          <div className={styles.rightPanel}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
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
              <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.input}
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.toggleButton}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton}>Register</button>
              <p className={styles.linkText}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}