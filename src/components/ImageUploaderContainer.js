import React, { useRef, useState, useEffect } from "react";
import "../styles/components/ImageUploaderContainer.css";

export const ImageUploaderContainer = ({ image, updateImage }) => {
	const fileInputRef = useRef();
	const [imageURL, setImageUrl] = useState("");

	//To set the image container to the original state when user navigates back to this screen
	useEffect(() => {
		if (image && typeof image !== "string") {
			// For File objects
			const url = URL.createObjectURL(image);
			setImageUrl(url);

			return () => URL.revokeObjectURL(url);
		} else if (typeof image === "string" && image.startsWith("http")) {
			// For external image URLs
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
				className="image-container-uploader"
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
