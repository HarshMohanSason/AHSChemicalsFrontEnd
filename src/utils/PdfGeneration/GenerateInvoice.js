import {
	pdf,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";

export default async function getGeneratedInvoice(order) {
	const blob = await pdf(<InvoicePDF order={order} />).toBlob();
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

function InvoicePDF({ order }) {
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
						<Text>{order.Customer?.DisplayName}</Text>
						<Text>
							{order.Customer?.BillAddr?.Line1},{" "}
							{order.Customer?.BillAddr?.City},{" "}
							{order.Customer?.BillAddr?.CountrySubDivisionCode}{" "}
							{order.Customer?.BillAddr?.PostalCode}
						</Text>
						<Text>
							{order.Customer?.PrimaryPhone?.FreeFormNumber}
						</Text>
						<Text>{order.Customer?.PrimaryEmailAddr?.Address}</Text>
					</View>
					<View style={styles.billToInvoiceNumberSection}>
						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Invoice Number:{" "}
							</Text>
							<Text>{order.DocNumber ?? "Temporary invoice"}</Text>
						</Text>
						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Invoice Date:{" "}
							</Text>
							<Text>{new Date().toLocaleDateString()}</Text>
						</Text>

						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Payment Due:{" "}
							</Text>
							<Text>
								{new Date(
									Date.now() + 30 * 24 * 60 * 60 * 1000,
								).toLocaleDateString()}
							</Text>
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
				{order.Products.map((item, index) => (
					<View key={index} style={styles.tableRow}>
						<Text style={styles.tableCell}>
							{item?.Name} {item.Size} {item?.SizeUnit} (Pack of{" "}
							{item.PackOf}) - {item?.Brand}
						</Text>
						<Text style={styles.tableCell}>{item.Quantity}</Text>
						<Text style={styles.tableCell}>${item.UnitPrice}</Text>
						<Text style={styles.tableCell}>
							${(item.UnitPrice * item.Quantity).toFixed(2)}
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
							<Text style={{ fontWeight: "bold" }}>
								TAX ({order.PlacedOrder.TaxRate * 100})%
							</Text>
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
								${order.PlacedOrder.SubTotal.toFixed(2)}
							</Text>
							<Text>
								${order.PlacedOrder.TaxAmount.toFixed(2)}
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
								${order.PlacedOrder.Total.toFixed(2)}
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
						payments are made to the account order provided. All
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
