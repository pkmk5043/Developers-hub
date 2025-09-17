// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // optional: create if you want custom styles

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Developer Hub</h1>
      <div className="button-group">
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
