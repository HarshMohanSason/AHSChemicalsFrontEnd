import getGeneratedInvoice from "../../../utils/PdfGeneration/GenerateInvoice";

export const InvoiceButton = ({ order}) => {
	if (order.status === "DELIVERED") {
		return (
			<button
				onClick={async () => {
					console.log("test")
				}}
			>
				Generate Final Invoice
			</button>
		);
	}

	if (order.status === "APPROVED") {
		return (
			<button
				onClick={async () => {
					//Temporary invoice. Only creates a blob and opens the dataURL in new window. 
					await getGeneratedInvoice(order)
				}}
			>
				Generate Temporary Invoice
			</button>
		);
	}

	return (
		<button disabled title="Approve or deliver order to generate invoice">
			Generate Invoice
		</button>
	);
};