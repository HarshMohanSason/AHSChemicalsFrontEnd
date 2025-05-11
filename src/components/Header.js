import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.css";
import logo from "../assets/logo.webp";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li >
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
