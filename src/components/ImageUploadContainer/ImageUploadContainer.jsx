import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import styles from "./ImageUploadContainer.module.css";

const ImageUploadContainer = ({ image, index = null, updateImage, removeImage}) => {
	const fileInputRef = useRef();
	const [imageURL, setImageUrl] = useState("");

	useEffect(() => {
		//Clear the image url if the image does not exist. 
		if (!image){
			setImageUrl("")
			return;
		}
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
		if (file && index !== null) {
			updateImage(file, index);
		}
	};

	const deleteImage = () => {
		setImageUrl("")
		if(index !== null){
			removeImage(index)
		}
	}

	return (
		<div className={styles.imageContainerDiv}>
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
			{index!== null && index > 0 && <button type="button" onClick={deleteImage}><FontAwesomeIcon icon={faTrashCan} /></button>}
		</div>
	);
};

export default ImageUploadContainer;
