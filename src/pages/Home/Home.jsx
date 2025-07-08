import React, { useState } from "react";
import HomePageImage1 from "../../assets/home_page_image1.webp";
import USAMapImage from "../../assets/usa_map.webp";
import { useCustomersContext } from "../../contexts/CustomersContext";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import CaliforniaMap from "../../components/CaliforniaMapSvg/CaliforniaMap";

const Home = () => {
	const navigate = useNavigate();
	const customersProvider = useCustomersContext();

	const [mapStats, setMapStats] = useState({
		totalCounties: 0,
		totalCustomers: 0,
	});

	return (
		<section className={styles.homePage}>
			<section className={styles.homePageIntroSection}>
				<figure>
					<img
						src={HomePageImage1}
						alt="Hospitality cleaning products"
					/>
				</figure>
				<section className={styles.introAreatextSection}>
					<h2>
						Elevating Hospitality with{" "}
						<span style={{ color: "#456206" }}>Excellence</span>
					</h2>
					<p>
						Our range of hospitality cleaning chemicals ensures
						hygienic, safe, and efficient operations across hotels,
						restaurants, and commercial spaces.
					</p>
					<button onClick={() => navigate("/contact-us")}>
						Contact Us
					</button>
				</section>
			</section>

			<section className={styles.mapSection}>
				<h2>Located Areas</h2>
				<p>
					We supply hospitality cleaning chemicals to{" "}
					<strong>{mapStats.totalCounties}</strong> counties across
					California, serving over{" "}
					<strong>{mapStats.totalCustomers}</strong> properties in
					total.
				</p>

				<section className={styles.mapArea}>
					<CaliforniaMap
						customers={customersProvider.customers}
						setMapStats={setMapStats}
					/>
					<img src={USAMapImage} alt="USA-map" />
				</section>

				<section id="property-list-text"></section>
			</section>
		</section>
	);
};

export default Home;
