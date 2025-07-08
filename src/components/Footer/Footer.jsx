import React from "react";
import Logo from "../../assets/logo_without_text.webp";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

/**
 * Footer component for the website.
 * Contains company branding, navigation links, and legal info.
 */
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<section className={styles.firstRow}>
				<div className={styles.logoWithCaption}>
					<figure>
						<img src={Logo} alt="logo" />
						<figcaption>AHS CHEMICALS</figcaption>
					</figure>
					<p>
						The Leading distributor of high-quality hospitality
						cleaning chemicals.
					</p>
				</div>
				<section className={styles.footerMenu}>
					<section>
						<h2>QUICK LINKS</h2>
						<nav>
							<Link to="/about-us">About Us</Link>
							<Link to="/products">Products</Link>
							<Link to="/cart">Cart</Link>
							<Link to="/account">Account</Link>
						</nav>
					</section>
					<section>
						<h2>RESOURCES</h2>
						<nav>
							<Link to="/sds">SDS</Link>
							<Link to="/contact-us">Contact Us</Link>
						</nav>
					</section>
					<section>
						<h2>LEGAL</h2>
						<nav>
							<Link to="/terms-of-service">Terms Of Service</Link>
							<Link to="/privacy-policy">Privacy Policy</Link>
						</nav>
					</section>
				</section>
			</section>
			{/* No social media yet. Will uncomment once social media is ready for the company 
			<section className={styles.socialMedia}>
				<i className="fa-brands fa-facebook-f"></i>
				<i className="fa-brands fa-instagram"></i>
				<i className="fa-brands fa-twitter"></i>
			</section>
			*/}
			<hr />
			<section className={styles.belowHrtext}>
				<p>© 2025 All rights reserved</p>
				<p>
					Developed by{" "}
					<a
						href="https://github.com/HarshMohanSason"
						target="_blank"
						rel="noopener noreferrer"
					>
						Harsh Mohan Sason
					</a>
				</p>
			</section>
		</footer>
	);
};

export default Footer;
