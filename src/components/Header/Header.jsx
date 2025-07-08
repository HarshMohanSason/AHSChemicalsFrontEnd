import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.webp";

/**
 * Header component
 * Renders the site logo and primary navigation bar.
 * Uses <NavLink> to manage active routes.
 */
const Header = ({ isMobileMenuOpen, setMenuSheet }) => {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </NavLink>

      <nav className={styles.navContainer}>
        <ul className={styles.navListLeft}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeNavLinkLeft : styles.navLinkLeft
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? styles.activeNavLinkLeft : styles.navLinkLeft
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? styles.activeNavLinkLeft : styles.navLinkLeft
              }
            >
              Products
            </NavLink>
          </li>
        </ul>

        <ul className={styles.navListRight}>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.activeNavLinkRight : styles.navLinkRight
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? styles.activeNavLinkRight : styles.navLinkRight
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Hamburger Button for the Mobile Menu*/}
      <div className={styles.hamburgerDiv}>
        <button
          onClick={() => setMenuSheet(!isMobileMenuOpen)}
          className={styles.hamburgerButton}
        >
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineTop : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineMiddle : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineBottom : ""}`}
          ></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
