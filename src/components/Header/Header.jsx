import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.webp";
import MobileMenu from "./MobileMenu";
import { useCartContext } from "../../contexts/CartContext"

const Header = () => {
  const {getCartItemCount} = useCartContext();
  
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? `${styles.active}` : ""}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about-us" 
              className={({ isActive }) => isActive ? `${styles.active}` : ""}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? `${styles.active}` : ""}
            >
              Products
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? `${styles.active}` : ""}
            >
              Cart {getCartItemCount() > 0 ? getCartItemCount(): ""}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/account" 
              className={({ isActive }) => isActive ? `${styles.active}` : ""}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;