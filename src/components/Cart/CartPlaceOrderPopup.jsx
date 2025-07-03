import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useCustomersContext } from "../../contexts/CustomersContext";
import styles from "./CartPlaceOrderPopup.module.css";

const CartPlaceOrderPopup = ({
	dialogRef,
	selectedCustomer,
	setSelectedCustomer,
	setSpecialInstructions,
	specialInstructions,
	placeOrder,
}) => {
	const customersProvider = useCustomersContext();
	const { confirmationAlert } = useAlertContext();

	return (
		<dialog ref={dialogRef} className={styles.cartPlaceOrderPopup}>
			<section className={styles.specialInstructionsSection}>
				<h1>Enter any additional comments or special instructions</h1>
				<textarea
					value={specialInstructions}
					onChange={(e) => setSpecialInstructions(e.target.value)}
				/>
			</section>
			<section className={styles.selectPropertySection}>
				<h1>Which property do you want to order for? </h1>
				<select
					value={selectedCustomer?.Id}
					onChange={(e) => {
						const selectedId = e.target.value;
						const selected =
							customersProvider.formattedCustomersForDisplay.find(
								(prop) => prop.Id === selectedId,
							);
						setSelectedCustomer(selected);
					}}
				>
					{customersProvider.formattedCustomersForDisplay.map(
						(prop) => (
							<option key={prop.Id} value={prop.Id}>
								{prop.Property.Name}{" "}
								{prop.Property.Address?.Line1},{" "}
								{prop.Property.Address?.City},{" "}
								{prop.Property.Address?.CountrySubDivisionCode}{" "}
								{prop.Property.Address.PostalCode}
							</option>
						),
					)}
				</select>
			</section>
			<section className={styles.actionsSection}>
				<button
					className={styles.cancelButton}
					onClick={() => dialogRef?.current?.close()}
				>
					Cancel
				</button>
				<button
					className={styles.placeOrderButton}
					onClick={() => {
						confirmationAlert.showAlert(
							"Are you sure?",
							"Do you want to proceed with placing the order? Note you cannot undo this action once order is placed. You can only place another order if this order is either approved or declined first.",
							async () => await placeOrder(),
							"Place My Order",
							"#A5C759",
						);
					}}
				>
					Place Order
				</button>
			</section>
		</dialog>
	);
};
export { CartPlaceOrderPopup };
