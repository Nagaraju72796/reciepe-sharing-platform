import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react'; 
export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function validateLogin(e) {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "admin") {
            alert("Login successful!");
            navigate('/home');
        } else {
            setError("Invalid email or password. Please try again.");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <header className={styles.headerSettings}>
                <img 
                    src="recipe-logo.jpg" 
                    alt="logo" 
                    className={styles.logoSettings}
                />
                <nav>
                    <ul className={styles.listSettings}>
                        <li className={styles.listItemSettings}>Home</li>
                        <li className={styles.listItemSettings}>Trending</li>
                    </ul>
                </nav>
                <div className="d-flex ms-auto me-3">
                <Link to="/">
                    <button className={`${styles.headerLoginButtonSettings} ms-1 me-1`}>
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className={`${styles.headerRegisterButtonSettings} ms-1 me-1`}>
                        Register
                    </button>
                </Link>
                </div>
            </header>

            <div 
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh', backgroundColor: 'white', backgroundSize: 'cover' }}
            >
                <div className={`${styles.loginContainerSettings} d-flex`}>
                    <div className={`${styles.loginLeftCard} p-3`} style={{ width: '50%' }}>
                        <h1 className={styles.greetSettings}>
                            Welcome to<br />Recipe Book
                        </h1>
                    </div>
                    <div className="p-3">
                        <h1>Login</h1>
                        <form onSubmit={validateLogin}>
                            <div className="mb-3 d-flex flex-column">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input 
                                    type="email"
                                    className={styles.inputFieldSettings}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 d-flex flex-column">
                                <label htmlFor="exampleInputPass">Password</label>
                                <div className="d-flex">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className={styles.inputFieldSettings}
                                        id="exampleInputPass"
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-2">
                                <a href="#">forgot password?</a>
                            </div>
                            {error && (
                                <div className="text-danger text-center mb-2">
                                    {error}
                                </div>
                            )}
                            <div className="d-flex justify-content-center">
                                <button 
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <a href="#">Don't have an account? Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}