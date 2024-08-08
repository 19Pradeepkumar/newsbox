import React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("authtoken", "");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="center">
        <h1>NewsBox</h1>
      </div>
      <div className="right">
        <p onClick={handleClick}>
          LOGOUT
          <Link to="/login"></Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
