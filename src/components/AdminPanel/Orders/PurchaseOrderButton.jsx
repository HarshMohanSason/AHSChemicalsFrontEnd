const PurchaseOrderButton = ({ order, onClicked, orderToEdit }) => {
	if (order.status === "PENDING" && orderToEdit && orderToEdit.Id === order.Id) {
		return <button onClick={onClicked}>Edit Items</button>;
	}

	return (
		<a
			href={order.PurchaseOrderURL}
			target="_blank"
			rel="noopener noreferrer"
		>
			View PDF
		</a>
	);
};
export default PurchaseOrderButton;
