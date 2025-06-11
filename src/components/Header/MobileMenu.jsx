import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setTimeout(() => {
      setMenuOpen(!menuOpen);
    }, 200);
  };

  return (
    <div className={styles.hamburgerWrapper}>
      <button
        onClick={toggleMenu}
        className={`${styles.hamburgerButton} ${menuOpen ? "menu-open" : ""}`}
      >
        <span className="bar top-bar"></span>
        <span className="bar middle-bar"></span>
        <span className="bar bottom-bar"></span>
      </button>
      {menuOpen && (
        <section className={`${styles.mobileMenuSheet} ${menuOpen ? "menu-open" : ""}`}>
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
