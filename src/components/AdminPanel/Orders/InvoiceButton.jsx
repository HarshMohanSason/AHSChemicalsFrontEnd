import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useOrdersCreation } from "../../../hooks/AdminPanel/Orders/UseOrdersCreation";
import getGeneratedInvoice from "../../../utils/PdfGeneration/GenerateInvoice";
import { beginQuickBooksAuth } from "../../../utils/Quickbooks/Auth";
import {
	createInvoice,
	createQuickBooksInvoiceObject,
} from "../../../utils/Quickbooks/Products";

export const InvoiceButton = ({ order }) => {
	const { user } = useAuth();
	const { alert } = useAlertContext();
	const { createMappedCustomerAndProductOrder } = useOrdersCreation();
	if (order.Status === "DELIVERED") {
		return (
			<button
				onClick={async () => {
					if (!user) {
						return;
					}
					try {
						const mappedOrder =
							await createMappedCustomerAndProductOrder(order);

						const invoiceObject =
							await createQuickBooksInvoiceObject(mappedOrder);
						const responseJson = await createInvoice(
							user,
							invoiceObject,
						);
						if (responseJson.code === 200) {
							mappedOrder.DocNumber = responseJson.data.DocNumber;
							await getGeneratedInvoice(mappedOrder);
							alert.showAlert(
								"Invoice was successfully generated added to quickbooks",
								"Success",
							);
							return;
						}
						if (responseJson.code === 401) {
							alert.showAlert(
								"Quickbooks session was logged out. Authenticating again. Please try uploading again once quickbooks is authenitcated again",
								"Warning",
							);
							await beginQuickBooksAuth(user);
						}
					} catch (error) {
						alert.showAlert(error.message, "Error");
					}
				}}
			>
				Generate Final Invoice
			</button>
		);
	}

	if (order.Status === "APPROVED") {
		return (
			<button
				onClick={async () => {
					const mappedOrder =
						await createMappedCustomerAndProductOrder(order);
					//Temporary invoice. Only creates a blob and opens the dataURL in new window.
					await getGeneratedInvoice(mappedOrder);
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
