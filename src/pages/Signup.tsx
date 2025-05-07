// SignupForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

interface SignupFormProps {
  saveUser: (user: User) => void;
  getUsers: () => User[];
  isValidEmail: (email: string) => boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ saveUser, getUsers, isValidEmail }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    setErrorMessage("");
    setEmailError("");
    setPasswordError("");

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

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      setErrorMessage("Email is already registered");
    } else {
      saveUser({ email, password });
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />

      {errorMessage && <p style={{ color: "red", marginBottom: "0.5rem" }}>{errorMessage}</p>}

      <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
