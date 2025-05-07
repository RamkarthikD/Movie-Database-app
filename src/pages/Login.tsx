import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupForm from "./Signup";

interface User {
  email: string;
  password: string;
}

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginMode, setIsLoginMode] = useState(location.pathname === "/login");

  useEffect(() => {
    setIsLoginMode(location.pathname === "/login");
  }, [location.pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const getUsers = (): User[] => JSON.parse(localStorage.getItem("users") || "[]");

  const saveUser = (newUser: User) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    const match = users.find((user) => user.email === email && user.password === password);
    if (match) {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            style={{ width: "100%", marginBottom: "0.25rem", padding: "0.5rem" }}
          />
          {emailError && <p style={{ color: "red", margin: 0 }}>{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            style={{ width: "100%", marginBottom: "0.25rem", padding: "0.5rem" }}
          />
          {passwordError && <p style={{ color: "red", margin: 0 }}>{passwordError}</p>}

          {errorMessage && (
            <p style={{ color: "red", marginBottom: "0.5rem" }}>{errorMessage}</p>
          )}

          <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
            Login
          </button>
        </form>
      ) : (
        <SignupForm saveUser={saveUser} getUsers={getUsers} isValidEmail={isValidEmail} />
      )}

      <p style={{ marginTop: "1rem" }}>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            const newPath = isLoginMode ? "/signup" : "/login";
            navigate(newPath);
          }}
          style={{ border: "none", background: "none", cursor: "pointer", color: "blue" }}
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default LoginSignup;
