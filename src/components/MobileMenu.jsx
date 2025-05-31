import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/MobileMenu.css";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setTimeout(() => {
      setMenuOpen(!menuOpen);
    }, 200);
  };

  return (
    <div className="hamburger-wrapper">
      <button
        onClick={toggleMenu}
        className={`hamburger-button ${menuOpen ? "menu-open" : ""}`}
      >
        <span className="bar top-bar"></span>
        <span className="bar middle-bar"></span>
        <span className="bar bottom-bar"></span>
      </button>
      {menuOpen && (
        <section className={`mobile-menu-sheet ${menuOpen ? "menu-open" : ""}`}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
                <hr />
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
                <hr />
              </li>
              <li>
                <Link to="/products">Products</Link>
                <hr />
              </li>
              <li>
                <Link to="/account">Account</Link>
                <hr />
              </li>
              <hr />
            </ul>
          </nav>
        </section>
      )}
    </div>
  );
};

export default MobileMenu;
