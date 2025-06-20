import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductTags = ({ product, setProduct, error }) => {
	const addTag = () => {
		const oldTags = [...product.tags];
		oldTags.push("");
		setProduct({ ...product, tags: oldTags });
	};

	const removeTag = (index) => {
		setProduct({
			...product,
			tags: product.tags.filter((_, idx) => idx !== index),
		});
	};

	const updateTags = (value, index) => {
		const oldTags = [...product.tags];
		oldTags[index] = value.toUpperCase();
		setProduct({ ...product, tags: oldTags });
	};

	return (
		<section className={styles.inputTagsSection}>
			{product.tags &&
				product.tags.map((tag, index) => (
					<div key={index} className={styles.tagInputFieldDiv}>
						<InputField
							style={{width: "80%"}}
							label={`Tag ${index + 1}`}
							value={tag}
							type="text"
							onChange={(e)=> updateTags(e.target.value, index)}
							placeholder="Enter tag"
							error={error?.[index]}
						/>
						{index > 0 && (
							<button type="button" onClick={() => removeTag(index)} className={styles.removeTagButton}>&times;</button>	
						)}
					</div>
				))}
			<button type="button" onClick={addTag} className={styles.addTagButton}>
				+
			</button>
		</section>
	);
};
