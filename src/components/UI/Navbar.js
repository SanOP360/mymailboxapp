// Navbar.js
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mail Box App</div>
      <div className="search-box">
        <input type="text" placeholder="Search emails here" />
        <button>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
