import React from "react";
import { Link } from "react-router-dom";
import styles from "./MobileMenuSheet.module.css";

const MobileMenuSheet = ({ isOpen }) => {

  return (
    <section  className={`${styles.menuSheet} ${isOpen ? styles.menuSheetActive : ""}`}>
      <nav>
        <ul className={styles.menuSheetUnorderedList}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.menuLink}>
              Home
            </Link>
            <hr className={styles.menuDivider} />
          </li>
          <li className={styles.menuItem}>
            <Link to="/about-us" className={styles.menuLink}>
              About Us
            </Link>
            <hr className={styles.menuDivider} />
          </li>
          <li className={styles.menuItem}>
            <Link to="/cart" className={styles.menuLink}>
              Cart
            </Link>
            <hr className={styles.menuDivider} />
          </li>
          <li className={styles.menuItem}>
            <Link to="/products" className={styles.menuLink}>
              Products
            </Link>
            <hr className={styles.menuDivider} />
          </li>
          <li className={styles.menuItem}>
            <Link to="/account" className={styles.menuLink}>
              Account
            </Link>
            <hr className={styles.menuDivider} />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default MobileMenuSheet;