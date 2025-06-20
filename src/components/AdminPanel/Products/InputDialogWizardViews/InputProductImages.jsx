import ImageUploadContainer from "../../../ImageUploadContainer/ImageUploadContainer";
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
		<button type="button" className={styles.addImageButton} onClick={addImageTile}>+</button>
		</section>
	);
};
