import { useState } from "react";
import { updateCustomerProductPrice } from "../../../utils/Firebase/Customers";
import { handleFirebaseError } from "../../../utils/Firebase/ErrorHandler";
import InputField from "../../InputField/InputField";
import styles from "./EditCustomerPrice.module.css";

const EditCustomerPrice = ({ product, dialogRef }) => {
	const [price, setPrice] = useState(product.price);

	return (
		<dialog className={styles.editProductDialog} ref={dialogRef}>
			<h1>Edit Price</h1>
			<InputField
				style={{ width: "90%", margin: "0 30px" }}
				onChange={(e) => setPrice(e.target.value)}
				value={price}
				type="number"
				placeholder={`Enter the new price for ${product.product_name}`}
			/>
			<div className={styles.dialogButtons}>
				<button onClick={() => dialogRef?.current.close()}>
					Cancel
				</button>
				<button
					onClick={async () => {
						loadingOverlay.trigger();
						try {
							await updateCustomerProductPrice(product.id, price);
						} catch (error) {
							alert.showAlert(handleFirebaseError(error))
						} finally {
							loadingOverlay.hide();
						}
					}}
				>
					Save
				</button>
			</div>
		</dialog>
	);
};

export default EditCustomerPrice;
