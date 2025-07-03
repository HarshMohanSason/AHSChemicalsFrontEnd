import React from "react";
import styles from "./InputDialogWizardShared.module.css"; // optional custom CSS module

const EditProductQuantity = ({ orderToEdit, setOrderToEdit }) => {
	const updateQuantity = (index, increment = true) => {
		const updatedItems = [...orderToEdit.items];
		const currentQty = updatedItems[index].quantity;
		updatedItems[index].quantity = Math.max(1, increment ? currentQty + 1 : currentQty - 1);
		setOrderToEdit({ ...orderToEdit, items: updatedItems });
	};

	return (
		<div className={styles.editQuantityContainer}>
			{orderToEdit?.items.map((item, index) => (
				<div key={index} className={styles.itemRow}>
					<img src={item.image} alt={item.product_name} className={styles.itemImage} />
					<div className={styles.itemInfo}>
						<h3>{item.product_name}</h3>
						<p>{item.brand} — {item.size} {item.sizeUnit} (Pack of {item.pack_of})</p>
					</div>
					<div className={styles.quantityControls}>
						<button type="button" onClick={() => updateQuantity(index, false)}>-</button>
						<span>{item.quantity}</span>
						<button type="button" onClick={() => updateQuantity(index, true)}>+</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default EditProductQuantity;