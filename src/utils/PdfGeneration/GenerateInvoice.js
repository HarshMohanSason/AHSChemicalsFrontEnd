import {
	pdf,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";
import { toTitleCase } from "../StringUtils";

export default async function getGeneratedInvoice(details) {
	const blob = await pdf(<InvoicePDF details={details} />).toBlob();
	// Convert blob to URL
	const blobUrl = URL.createObjectURL(blob);

	// Open in new tab/window
	window.open(blobUrl);

	return blob;
}
const styles = StyleSheet.create({
	page: { paddingVertical: 30, paddingHorizontal: 50 },
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logoImage: {
		width: 170,
	},
	heading: {
		fontSize: 35,
		marginBottom: 20,
		fontWeight: "bold",
		color: "#A5C759",
	},
	companyAddressColumn: {
		fontSize: 10,
		gap: 5,
		flexDirection: "column",
		color: "black",
	},
	billToViewSection: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		fontSize: 10,
	},
	billToAddressSection: {
		flexDirection: "column",
		gap: 5,
	},
	billToInvoiceNumberSection: {
		flexDirection: "column",
		gap: 5,
	},
	tableRow: {
		marginTop: 5,
		flexDirection: "row",
		borderBottom: "1px solid #ccc", // underline per row
	},
	tableHeaderCell: {
		flex: 1,
		fontWeight: "bold",
		fontSize: 10,
		backgroundColor: "#A5C759",
		color: "#ffffff",
		padding: 6,
		textAlign: "center",
		borderRight: "1px solid #fff",
	},

	tableCell: {
		flex: 1,
		fontSize: 9,
		padding: 3,
		textAlign: "center",
	},
	summaryContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 20,
		marginRight: 7,
	},
});

function InvoicePDF({ details }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.headerContainer}>
					<Text style={styles.heading}>INVOICE</Text>
					<Image
						style={styles.logoImage}
						src={process.env.REACT_APP_PDF_AHS_LOGO}
					/>
				</View>
				<View style={styles.companyAddressColumn}>
					<Text style={{ fontWeight: "bold" }}>
						Azure Hospitality Supply
					</Text>
					<Text>{process.env.REACT_APP_COMPANY_ADDRESS_LINE1}</Text>
					<Text>{process.env.REACT_APP_COMPANY_ADDRESS_LINE2}</Text>
					<Text>Phone: {process.env.REACT_APP_COMPANY_PHONE}</Text>
					<Text>
						Email: {process.env.REACT_APP_COMPANY_EMAIL_ADDRESS}
					</Text>
				</View>
				<View style={styles.billToViewSection}>
					<View style={styles.billToAddressSection}>
						<Text style={{ fontWeight: "bold" }}>Bill To:</Text>
						<Text>{details.customer_name ?? "N/A"}</Text>
						<Text>
							{toTitleCase(
								details.property?.name ?? "Unknown Property",
							)}
						</Text>
						<Text>
							{toTitleCase(
								details.property?.street ?? "Unknown Street",
							)}
						</Text>
						<Text>
							{toTitleCase(details.property?.city ?? "City")},{" "}
							{toTitleCase(details.property?.state ?? "State")},{" "}
							{details.property?.postal ?? "ZIP"}
						</Text>
						<Text>
							{details.customer_phone ?? "Phone not provided"}
						</Text>
						<Text>
							{details.customer_email ?? "Email not provided"}
						</Text>
					</View>
					<View style={styles.billToInvoiceNumberSection}>
						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Invoice Number:{" "}
							</Text>
							<Text>
								{details.invoice_number ?? "Temporary Invoice"}
							</Text>
						</Text>

						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Invoice Date:{" "}
							</Text>
							<Text>{new Date().toLocaleDateString()}</Text>
						</Text>

						<Text>
							<Text style={{ fontWeight: "bold" }}>Payment Due:{" "}</Text>
							<Text>{details.payment_due
								? details.payment_due
										.toDate()
										.toLocaleDateString()
								: "Net 30"}</Text>
						</Text>
					</View>
				</View>
				{/* Table Header */}
				<View style={styles.tableRow}>
					<Text style={styles.tableHeaderCell}>Item</Text>
					<Text style={styles.tableHeaderCell}>Quantity</Text>
					<Text style={styles.tableHeaderCell}>Price per unit</Text>
					<Text style={styles.tableHeaderCell}>Amount</Text>
				</View>

				{/* Table Body */}
				{details.items.map((item, index) => (
					<View key={index} style={styles.tableRow}>
						<Text style={styles.tableCell}>
							{toTitleCase(item.product_name)} {item.size}{" "}
							{toTitleCase(item.sizeUnit)} (Pack of {item.pack_of}
							) - {toTitleCase(item.brand)}
						</Text>
						<Text style={styles.tableCell}>{item.quantity}</Text>
						<Text style={styles.tableCell}>${item.price}</Text>
						<Text style={styles.tableCell}>
							${(item.price * item.quantity).toFixed(2)}
						</Text>
					</View>
				))}
				<View style={styles.summaryContainer}>
					<View
						style={{
							width: 120,
							flexDirection: "row",
							marginRight: 57,
							gap: 50,
						}}
					>
						<View
							style={{
								fontSize: 10,
								flexDirection: "column",
								gap: 5,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>SUBTOTAL</Text>
							<Text style={{ fontWeight: "bold" }}>TAX</Text>
							<Text
								style={{
									marginRight: "10px",
									paddingLeft: "2px",
									paddingVertical: "5px",
									fontWeight: "bold",
									backgroundColor: "#A5C759",
									width: "170px",
									color: "white",
									fontSize: "13",
								}}
							>
								TOTAL
							</Text>
						</View>
						<View
							style={{
								fontSize: 10,
								flexDirection: "column",
								gap: 5,
								alignItems: "center",
							}}
						>
							<Text>
								${details.subtotal?.toFixed(2) ?? "0.00"}
							</Text>
							<Text>
								$
								{details.subtotal && details.tax_rate
									? (
											(details.subtotal *
												details.tax_rate) /
											100
										).toFixed(2)
									: "0.00"}
							</Text>
							<Text
								style={{
									paddingVertical: "5px",
									fontWeight: "bold",
									backgroundColor: "#A5C759",
									color: "white",
									fontSize: "13",
								}}
							>
								${details.total?.toFixed(2) ?? "0.00"}
							</Text>
						</View>
					</View>
				</View>
				<View>
					<Text
						style={{
							fontWeight: "bold",
							marginTop: 10,
							marginBottom: 4,
							fontSize: 10,
						}}
					>
						Terms and Conditions
					</Text>
					<Text style={{ fontSize: 9 }}>
						Payment for this invoice is due within 30 days from the
						invoice date ("Net 30"). A late fee may be applied to
						any unpaid balance after the due date. Please ensure
						payments are made to the account details provided. All
						goods remain the property of the supplier until full
						payment is received. Any discrepancies must be reported
						within 7 days of receipt. By making a purchase, you
						agree to these terms.
					</Text>
				</View>
			</Page>
		</Document>
	);
}
