import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
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
		oldTags[index] = value;
		setProduct({ ...product, tags: oldTags });
	};

	return (
		<section className={styles.inputTagsSection}>
			{product.tags &&
				product.tags.map((tag, index) => (
					<div key={index} className={styles.tagInputFieldDiv}>
						<InputField
							label={`Tag ${index + 1}`}
							value={tag}
							type="text"
							onChange={(e)=> updateTags(e.target.value, index)}
							placeholder="Use short and important words"
							error={error?.[index]}
						/>
						{index > 0 && (
							<button type="button" onClick={() => removeTag(index)} style={{marginTop: "45px", width: "40px", cursor: "pointer"}}><FontAwesomeIcon icon={faTrashCan} /></button>	
						)}
					</div>
				))}
			<button type="button" onClick={addTag} className={styles.addButton} style={{top: "10px", right: "10px"}}>
				+
			</button>
		</section>
	);
};

export const validateTags = (tags) => {
	const regex = /^[a-zA-Z0-9-_]{1,30}$/;
	const errors = tags.map((tag) => {
		if(tag === ""){
			return "Tag cannot be empty"
		}
		else if (!regex.test(tag)){
			return "Tag can only contain letters,numbers and underscore"
		}
		return null
	});
	const hasErrors = errors.some((error)=> error !== null)
	return new FormValidationResult(!hasErrors, errors)
};
