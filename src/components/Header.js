import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.css";
import logo from "../assets/logo.webp";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header
      id="header"
      className="fixed top-0 left-0 w-full flex items-center justify-between bg-white z-[999] p-2 px-10 rounded-bl-3xl rounded-br-3xl shadow-lg"
    >
      <img src={logo} className="h-[80px]" alt="Logo" />
      <nav>
        <ul className="hidden list-none text-[24.32px] gap-[40px] font-extralight xl:flex">
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
