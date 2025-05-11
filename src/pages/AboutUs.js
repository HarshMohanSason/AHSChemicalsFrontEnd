import React from "react";
import AboutUsImage from "../assets/about_us.webp";
import "../styles/pages/AboutUs.css";
import { ReactComponent as OurMissionSvg } from "../assets/our_mission_logo.svg";
import { ReactComponent as OurVisionSvg } from "../assets/our_vision_logo.svg";

function AboutUs() {
	return (
		<section className="about-us">
			<section className="about-us-first-section">
				<article className="text-area">
					<h1>About Us</h1>
					<p>
						Our range of hospitality cleaning chemicals ensures
						hygienic, safe, and efficient operations across hotels,
						restaurants, and commercial spaces. Our range of
						hospitality cleaning chemicals ensures hygienic, safe,
						and efficient operations across hotels, restaurants, and
						commercial spaces.
					</p>
					<p>
						Our range of hospitality cleaning chemicals ensures
						hygienic, safe, and efficient operations across hotels,
						restaurants, and commercial spaces.
					</p>
				</article>
				<img src={AboutUsImage} alt="about-us-image" />
			</section>
			<section className="our-mission-vision-section">
				<div className="oval-container">
					<section className="our-mission">
						<div className="logos">
							<OurMissionSvg />
						</div>
						<h4>
							<span
								style={{
									fontSize: "46.53px",
									color: "#777777",
								}}
							>
								Our
							</span>{" "}
							<span
								style={{
									fontSize: "46.53px",
									color: "#a5c759",
								}}
							>
								Mission
							</span>
						</h4>
						<p>
							Our mission is to{" "}
							<strong>deliver exceptional service</strong>,
							ensuring our customers receive reliable, effective
							solutions that keep their operations running
							smoothly.
						</p>
					</section>
					<section className="our-vision">
						<div className="logos">
							<OurVisionSvg />
						</div>
						<h4>
							<span
								style={{
									fontSize: "46.53px",
									color: "#777777",
								}}
							>Our
							</span>{" "}
							<span
								style={{
									fontSize: "46.53px",
									color: "#a5c759",
								}}
							>Vision
							</span>
						</h4>
						<p>
							We{" "}
							<strong>
								believe in building lasting relationships
							</strong>{" "}
							through trust, affordability, and unparalleled
							customer care.
						</p>
					</section>
				</div>
			</section>
		</section>
	);
}

export default AboutUs;
