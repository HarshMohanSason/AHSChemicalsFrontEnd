import React, { useRef, useState, useEffect } from "react";
import styles from "./ImageUploadContainer.module.css";

const ImageUploadContainer = ({ image, updateImage }) => {
	const fileInputRef = useRef();
	const [imageURL, setImageUrl] = useState("");

	useEffect(() => {
		//For file type images, create a url and display it
		if (image && typeof image !== "string") {
			const url = URL.createObjectURL(image);
			setImageUrl(url);

			return () => URL.revokeObjectURL(url);

		} //For url images, simply display them
		else if (typeof image === "string" && image.startsWith("http")) {
			setImageUrl(image);
		}
	}, [image]);


	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			updateImage(file);
		}
	};

	return (
		<>
			<div
				className={styles.imageContainer}
				style={{
					backgroundImage: imageURL ? `url(${imageURL})` : "none",
					backgroundSize: "cover",
					backgroundPosition: "center",
					cursor: "pointer",
				}}
				onClick={() => fileInputRef.current.click()}
			>
				{!imageURL && "+"}
			</div>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleFileChange}
				accept="image/*"
				style={{ display: "none" }}
			/>
		</>
	);
};

export default ImageUploadContainer;
