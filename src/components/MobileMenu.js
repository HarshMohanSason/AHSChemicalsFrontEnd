import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
      setTimeout(() => {
    setMenuOpen(!menuOpen);
  }, 200);
  };

  return (
    <div className="flex items-center justify-between p-4 xl:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center space-y-2 w-10 h-10 focus:outline-none relative"
      >
        <span
          className={`bar transform transition-all duration-300 ease-in-out ${menuOpen ? "translate-y-3.5 rotate-45" : ""}`}
        />
        <span
          className={`bar transform transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
        />
        <span
          className={`bar transform transition-all duration-300 ease-in-out ${menuOpen ? "-translate-y-3.5 -rotate-45" : ""}`}
        />
      </button>
      {/* Menu Sheet */}
      {menuOpen && (
        <section className={`mobile-menu-sheet ${menuOpen ? 'menu-open' : ''}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <hr/>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
              <hr/>
            </li>
            <li>
              <Link to="/products">Products</Link>
              <hr/>
            </li>
            <li>
              <Link to="/account">Account</Link>
              <hr/>
            </li>
            <hr />
          </ul>
        </section>
      )}
    </div>
  );
};

export default MobileMenu;
