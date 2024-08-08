import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setAuthtoken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (data.success) {
        const token = email;
        setAuthtoken(token);
        localStorage.setItem("authtoken", token);
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input1"
          />
        </div>
        <div>
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input1"
          />
        </div>
        <button
          type="submit"
          className="button1"
          style={{ marginLeft: "40px" }}
        >
          Login
        </button>
      </form>
      <p className="text">
        Don't have an account?{" "}
        <Link to="/signup" className="link">
          Create new account
        </Link>
      </p>
    </div>
  );
}

export default Login;
