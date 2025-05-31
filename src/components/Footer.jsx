import React, { useRef } from "react";
import Logo from "../assets/logo_without_text.webp";
import { Link } from "react-router-dom";
import "../styles/components/Footer.css";
import { useAuth } from "../utils/firebase/AuthContext";
import LoginPopup from "./LoginPopup";

const Footer = () => {
	const dialogRef = useRef(null);
	const {user} = useAuth();

	return (
		<footer>
			<section className="first-row">
				<div className="logo-with-caption">
					<figure>
						<img src={Logo} alt="logo" />
						<figcaption>AHS CHEMICALS</figcaption>
					</figure>
					<p>
						The Leading distributor of high-quality hospitality
						cleaning chemicals.
					</p>
				</div>
				<section className="footer-menu">
					<section className="quick-links">
						<h2>QUICK LINKS</h2>
						<nav>
							<Link to="/about-us">About Us</Link>
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
							<Link to="/account">Account</Link>
						</nav>
					</section>
					<section className="resources">
						<h2>RESOURCES</h2>
						<nav>
							<Link to="/about_us">SDS</Link>
							<Link to="/products">Contact Us</Link>
						</nav>
					</section>
					<section className="legal">
						<h2>LEGAL</h2>
						<nav>
							<Link to="/about_us">Terms Of Service</Link>
							<Link to="/about_us">Privacy Policy</Link>
						</nav>
					</section>
				</section>
			</section>

			<section className="social-media">
				<i className="fa-brands fa-facebook-f"></i>
				<i className="fa-brands fa-instagram"></i>
				<i className="fa-brands fa-twitter"></i>
			</section>
			<hr />
			<section className="below-hr-text">
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
			<LoginPopup dialogRef={dialogRef} title="Login Required" bodyText="You need Log in your account to view products. This helps us provide a better and safer experience for you"/>
		</footer>
	);
};

export default Footer;
