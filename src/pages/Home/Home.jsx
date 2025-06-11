import React, {useEffect} from "react";
import "./Home.css";
import HomePageImage1 from "../../assets/home_page_image1.webp";
import USAMapImage from "../../assets/usa_map.webp";
import { ReactComponent as CaliforniaMapSvg } from "../../assets/california_map.svg";
import { addCityMarkers } from "../../utils/CaliforniaMapUtils";

const Home = () => {
	//Load the markers for the california map svg
	useEffect(() => {
		const svg = document.getElementById("california-svg"); 
		if (svg) {
			addCityMarkers(svg); 
		}
	}, []);

	return (
		<section className="home-page">
			<section className="home-page-intro-section">
				<figure>
					<img
						src={HomePageImage1}
						alt="Hospitality cleaning products"
					/>
				</figure>
				<div className="text-area">
					<h2>
						Elevating Hospitality with{" "}
						<span style={{ color: "#456206" }}>Excellence</span>
					</h2>
					<p>
						Our range of hospitality cleaning chemicals ensures
						hygienic, safe, and efficient operations across hotels,
						restaurants, and commercial spaces.
					</p>
					{/* To do add a link here to contact us page */}
					<button>Contact Us</button>
				</div>
			</section>

			<section className="map-section">
				<h2> Located Areas </h2>
				<p>
					We supply hospitality cleaning chemicals to{" "}
					<strong> 10 </strong> counties across California, serving
					over <strong> 34 </strong>properties in total.
				</p>
				<section className="map-area">
					<CaliforniaMapSvg />
					<img src={USAMapImage} alt="USA-map" />
				</section>
				
				{/* Dynamically populated */}
				<section id="property-list-text" className="property-list">
       			</section>
			</section>
		</section>
	);
}

export default Home;
