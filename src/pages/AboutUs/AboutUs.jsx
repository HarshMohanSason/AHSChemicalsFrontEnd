import React from "react";
import AboutUsImage from "../../assets/about_us.webp";
import { ReactComponent as OurMissionSvg } from "../../assets/our_mission_logo.svg";
import { ReactComponent as OurVisionSvg } from "../../assets/our_vision_logo.svg";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
	return (
		<section className={styles.aboutUs}>
			<section className={styles.firstSection}>
				<article className={styles.textArea}>
					<h1 className={styles.heading}>About Us</h1>
					<p className={styles.paragraph}>
						At AHS Chemicals, we specialize in delivering
						premium-quality cleaning solutions designed specifically
						for the hospitality industry. With a commitment to
						safety, performance, and reliability, our products help
						maintain the highest hygiene standards across hotels,
						restaurants, and commercial establishments. Whether it’s
						guest rooms, kitchens, or public spaces, we provide
						effective solutions that ensure a clean and welcoming
						environment.
					</p>
					<p className={styles.paragraph}>
						Our team is dedicated to understanding the unique needs
						of the hospitality sector. By continuously improving our
						formulations and offering tailored support, we empower
						businesses to meet stringent health regulations while
						streamlining their cleaning operations. From everyday
						maintenance to deep cleaning requirements, our product
						line is built to handle it all—safely and efficiently.
					</p>
				</article>
				<img
					src={AboutUsImage}
					alt="about-us-image"
					className={styles.aboutImage}
				/>
			</section>

			<section className={styles.missionVisionSection}>
				<div className={styles.ovalContainer}>
					<section className={styles.mission}>
						<div className={styles.logoWrapper}>
							<OurMissionSvg />
						</div>
						<h4>
							<span
								style={{
									fontWeight: 500,
									fontSize: "46.53px",
									color: "#777777",
								}}
							>
								Our
							</span>{" "}
							<span
								style={{
									fontWeight: 500,
									fontSize: "46.53px",
									color: "#a5c759",
								}}
							>
								Mission
							</span>
						</h4>
						<p className={styles.missionText}>
							Our mission is to{" "}
							<strong>deliver exceptional service</strong>,
							ensuring our customers receive reliable, effective
							solutions that keep their operations running
							smoothly.
						</p>
					</section>

					<section className={styles.vision}>
						<div className={styles.logoWrapper}>
							<OurVisionSvg />
						</div>
						<h4>
							<span
								style={{
									fontWeight: 500,
									fontSize: "46.53px",
									color: "#777777",
								}}
							>
								Our
							</span>{" "}
							<span
								style={{
									fontWeight: 500,
									fontSize: "46.53px",
									color: "#a5c759",
								}}
							>
								Vision
							</span>
						</h4>
						<p className={styles.visionText}>
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
};

export default AboutUs;
