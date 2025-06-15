import {
	pdf,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	Link,
} from "@react-pdf/renderer";

export default async function handleGeneratePdf(order) {
	const blob = await pdf(<PurchaseOrderPDF orderDetails={order} />).toBlob();
	const url = URL.createObjectURL(blob);
	window.open(url, "_blank"); // Opens the PDF in a new tab
}

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10 },
	borderLine: {
		border: "2pt solid #415391",
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 5,
		flex: 1,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logoImage: {
		width: 140,
		marginBottom: 20,
	},
	heading: {
		marginTop: 25,
		fontSize: 25,
		fontWeight: "bold",
		color: "#415391",
	},
	metaDataContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	companyAddressColumn: {
		fontSize: 8,
		gap: 5,
		flexDirection: "column",
		color: "black",
	},
	datePONumberSection: {
		fontSize: 8,
		gap: 5,
		flexDirection: "column",
		color: "black",
		paddingBottom: 40,
	},
	vendorAndShipToSection: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	vendorInfoColumn: {
		width: 200,
		fontSize: 8,
		flexDirection: "column",
		gap: 5,
	},
	vendorColumnHeading: {
		backgroundColor: "#415391",
		color: "white",
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 20,
		fontSize: 10,
		textAlign: "start",
	},
	shipToColumn: {
		width: 200,
		fontSize: 8,
		flexDirection: "column",
		gap: 5,
	},
	shipToHeading: {
		backgroundColor: "#415391",
		color: "white",
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 20,
		fontSize: 10,
		textAlign: "start",
	},
	shippingContainer: {
		borderWidth: 2,
		borderColor: "#415391",
		marginTop: 15,
	},
	shippingMethodRow: {
		flexDirection: "row",
		paddingTop: 4,
		paddingBottom: 4,
		backgroundColor: "#415391",
	},
	shippingMethodHeaderText: {
		flex: 1,
		color: "white",
		fontSize: 10,
		textAlign: "center",
	},
	shippingRow: {
		flexDirection: "row",
		borderColor: "#415391",
	},
	shippingCell: {
		flex: 1,
		padding: 2,
		fontSize: 8,
		borderRightWidth: 2,
		borderColor: "#415391",
		textAlign: "center",
	},
	lastCell: {
		borderRightWidth: 0,
	},
	itemDetailsColumn: {
		borderWidth: 2,
		borderColor: "#415391",
		marginTop: 10,
	},
	commentAndSubtotalSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	bottomPageText: {
		fontSize: 8,
		textAlign: "center",
		marginBottom: 10,
	},
});

function PurchaseOrderPDF({ orderDetails }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.borderLine}>
					<View style={[styles.section, styles.headerContainer]}>
						<Image
							style={styles.logoImage}
							src={process.env.REACT_APP_PDF_AHS_LOGO}
						/>
						<Text style={styles.heading}>Purchase Order</Text>
					</View>
					<View style={[styles.section, styles.metaDataContainer]}>
						<View style={styles.companyAddressColumn}>
							<Text style={{ fontWeight: "bold" }}>
								Azure Hospitality Supply
							</Text>
							<Text>
								{process.env.REACT_APP_COMPANY_ADDRESS_LINE1}
							</Text>
							<Text>
								{process.env.REACT_APP_COMPANY_ADDRESS_LINE2}
							</Text>
							<Text>
								Phone: {process.env.REACT_APP_COMPANY_PHONE}
							</Text>
							<Text>
								Website:{" "}
								<Link
									src="https://azurehospitalitysupply.com"
									style={{
										color: "#415391",
										textDecoration: "underline",
									}}
								>
									azurehospitalitysupply.com
								</Link>
							</Text>
						</View>
						<View style={styles.datePONumberSection}>
							<Text>
								<Text style={{ fontWeight: "bold" }}>
									Date Ordered:
								</Text>{" "}
								{orderDetails.timestamp
									.toDate()
									.toLocaleDateString()}
							</Text>
							<Text>
								<Text style={{ fontWeight: "bold" }}>PO#:</Text>{" "}
								{orderDetails.id}
							</Text>
						</View>
					</View>
					<View style={styles.vendorAndShipToSection}>
						<View style={styles.vendorInfoColumn}>
							<Text style={styles.vendorColumnHeading}>
								VENDOR
							</Text>
							<Text style={{ fontWeight: "bold" }}>
								Azure Hospitality Supply
							</Text>
							<Text>AHS Chemicals</Text>
							<Text>
								{process.env.REACT_APP_COMPANY_ADDRESS_LINE1}
							</Text>
							<Text>
								{process.env.REACT_APP_COMPANY_ADDRESS_LINE2}
							</Text>
							<Text>
								Phone: {process.env.REACT_APP_COMPANY_PHONE}
							</Text>
						</View>
						<View style={styles.shipToColumn}>
							<Text style={styles.shipToHeading}>SHIP TO</Text>
							<Text>{orderDetails.customerName ?? "Harsh"}</Text>
							<Text>
								{orderDetails.companyName ||
									"Azure Hospitality"}
							</Text>
							<Text>
								{orderDetails.customerAddress1 ||
									"2040 N Preisker lane"}
							</Text>
							<Text>
								{orderDetails.customerAddress2 ||
									"Santa Maria, USA, 93456"}
							</Text>
							<Text>
								{orderDetails.customerPhone ||
									"+1 (559)-548-4965"}
							</Text>
						</View>
					</View>
					<View style={styles.shippingContainer}>
						{/* Header */}
						<View style={styles.shippingMethodRow}>
							<Text style={styles.shippingMethodHeaderText}>
								REQUISITIONER
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								SHIP VIA
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								F.O.B
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								SHIPPING TERMS
							</Text>
						</View>

						{/* Row 1 */}
						<View style={styles.shippingRow}>
							<Text style={styles.shippingCell}>
								Mayank Patel
							</Text>
							<Text style={styles.shippingCell}>In House</Text>
							<Text style={styles.shippingCell}>Factory</Text>
							<Text
								style={[styles.shippingCell, styles.lastCell]}
							>
								Net 30
							</Text>
						</View>
					</View>
					<View style={styles.itemDetailsColumn}>
						<View style={styles.shippingMethodRow}>
							<Text style={styles.shippingMethodHeaderText}>
								SKU#
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								DESCRIPTION
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								QTY
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								PRICE
							</Text>
							<Text style={styles.shippingMethodHeaderText}>
								TOTAL
							</Text>
						</View>
						{orderDetails.items.map((item, index) => (
							<View key={index} style={styles.shippingRow}>
								<Text style={styles.shippingCell}>
									{item.sku}
								</Text>
								<Text style={styles.shippingCell}>
									{item.product_name} {item.size}{" "}
									{item.sizeUnit} - {item.brand}
								</Text>
								<Text style={styles.shippingCell}>
									{item.quantity}
								</Text>
								<Text style={styles.shippingCell}>
									{item.price || 5000}
								</Text>
								<Text
									style={[
										styles.shippingCell,
										styles.lastCell,
										{ backgroundColor: "#f2f2f2" },
									]}
								>
									{item.quantity * item.price}{" "}
								</Text>
							</View>
						))}
					</View>
					<View style={styles.commentAndSubtotalSection}>
						<View style={{ fontSize: 8, marginTop: 10 }}>
							<Text style={{ fontSize: 10, fontWeight: "bold" }}>
								Comments or Special Instructions
							</Text>
						</View>
						<View style={{flexDirection: "row", marginRight: 40, gap: 50, marginTop: 10}}>
						<View style={{ fontSize: 10, flexDirection: "column", gap: 5}}>
							<Text>SUBTOTAL</Text>
							<Text>TAX</Text>
							<Text style={styles.TotalText}>TOTAL</Text>
						</View>
						<View style={{ fontSize: 10, flexDirection: "column", gap: 5, fontWeight: "bold"}}>
							<Text>5000</Text>
						</View>
						</View>
					</View>
					<Text style={styles.bottomPageText}>
						If you have any questions about this purchase order,
						please contact at inbox@azurehospitalitysupply.com
					</Text>
				</View>
			</Page>
		</Document>
	);
}
