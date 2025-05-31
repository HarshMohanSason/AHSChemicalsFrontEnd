import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.css";
import logo from "../assets/logo.webp";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../utils/firebase/AuthContext";
import { useCart } from "../hooks/CartHook";
import LoginPopup from "./LoginPopup";

const Header = () => {
  const { user, loading } = useAuth();
  const { cartItems } = useCart();
  const dialogRef = useRef(null);

  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  dialogRef.current.showModal();
                }
              }}
            >
              Products
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to="/cart"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  dialogRef.current.showModal();
                }
              }}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link to="/account">Login</Link>
          </li>
        </ul>
      </nav>
      <LoginPopup dialogRef={dialogRef} title="Login Required" bodyText="You need Log in your account to view products. Please visit the login page. This helps us provide a better and safer experience for you"/>
      <MobileMenu />
    </header>
  );
};

export default Header;
