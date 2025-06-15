import { useAlertContext } from "../../../../contexts/AlertBoxContext";
import ImageUploadContainer from "../../../ImageUploadContainer/ImageUploadContainer";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductImages = ({ product, setProduct }) => {
	
	const updateImage = (file, index) => {
		const oldImages = [...product.images];
		if (oldImages[index]) {
			oldImages[index] = file;
		} else {
			const emptyIndex = oldImages.findIndex((img) => !img);
			if (oldImages[emptyIndex] !== -1) {
				oldImages[emptyIndex] = file;
			}
		}
		setProduct({ ...product, images: oldImages });
	};

	const addImageTile = () => {
		const newImages = [...product.images]; 
		newImages.push("")
		setProduct({ ...product, images: newImages });
	}

	const removeImage = (index) => {
		const oldImages = [...product.images];
		setProduct({...product, images: oldImages.filter((_,idx)=> idx !== index)})
	};

	return (
		<section className={styles.inputProductImages}>
			{product.images &&
				product.images.map((image, index) => (
					<ImageUploadContainer
						key={index}
						image={image}
						index={index}
						updateImage={updateImage}
						removeImage={removeImage}
					/>
				))}
		<button type="button" className={styles.addButton} onClick={addImageTile}>+</button>
		</section>
	);
};

export const validateImages = (images, alert) => {
	let error = null;
	if (images.length === 0 || images[0] === "") {
		error = "You need at least one image";
		alert.showAlert(error, "Error")
	}
	return new FormValidationResult(!error, error)
};
