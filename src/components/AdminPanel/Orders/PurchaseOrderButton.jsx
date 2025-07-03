const PurchaseOrderButton = ({ order, onClicked, orderToEdit }) => {
	if (order.status === "PENDING" && orderToEdit && orderToEdit.id === order.id) {
		return <button onClick={onClicked}>Edit Items</button>;
	}

	return (
		<a
			href={order.purchase_order_url}
			target="_blank"
			rel="noopener noreferrer"
		>
			View PDF
		</a>
	);
};
export default PurchaseOrderButton;
