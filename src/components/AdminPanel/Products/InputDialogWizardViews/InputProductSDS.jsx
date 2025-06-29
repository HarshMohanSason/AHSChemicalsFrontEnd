import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductSDS = ({ product, setProduct, error }) => {
	const [isUrl, setUrl] = useState(false);

	useEffect(() => {
		if (typeof product.sds === "string" && product.sds.startsWith("http")) {
			setUrl(true);
		} else {
			setUrl(false);
		}
	}, [product.sds]);

	return (
		<section className={styles.productSDSInputSection}>
			{!isUrl && (
				<>
					<label className={styles.sdsInputLabel}>Add SDS Sheet (PDF)</label>
					<input
						type="file"
						accept="application/pdf"
						onChange={(e) => {
							const file = e.target.files[0];
							if (file) {
								setProduct({ ...product, sds: file });
							}
						}}
					/>
				</>
			)}

			{isUrl && (
				<div className={styles.sdsControls}>
					<a
						href={product.sds}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.viewButton}
					>
						View PDF
					</a>
					<button
						type="button"
						style={{marginLeft: "10px", cursor: "pointer"}}
						onClick={() => setProduct({ ...product, sds: null })}
						className={styles.deleteButton}
					>
					<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			)}
		</section>
	);
};
