import {
	pdf,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";
import { convertToGallons } from "../SizeConverter";

export const getGeneratedShippingManifest = async (details) => {
	const blob = await pdf(<ShippingManifestPDF details={details} />).toBlob();
	// Convert blob to URL
	const blobUrl = URL.createObjectURL(blob);

	// Open in new tab/window
	window.open(blobUrl);

	return blob;
};

const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10 },
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logoImage: {
		width: 150,
	},
	heading: {
		fontSize: 16,
		marginBottom: 5,
		fontWeight: "bold",
		color: "#415391",
	},
	companyAddressContainer: {
		fontSize: 8,
	},
	shipToAddressSection: {
		marginTop: 10,
		fontSize: 8,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	shippingContainer: {
		borderWidth: 2,
		borderColor: "#415391",
		marginTop: 15,
	},

	shippingMethodRow: {
		flexDirection: "row",
		backgroundColor: "#415391",
		paddingVertical: 4,
	},

	shippingDataRow: {
		flexDirection: "row",
		borderTopWidth: 0.5,
		borderColor: "#ccc",
		paddingVertical: 2,
	},

	shippingMethodHeaderText: {
		color: "white",
		fontSize: 6,
		textAlign: "center",
		paddingHorizontal: 2,
	},

	shippingCellData: {
		fontSize: 6,
		textAlign: "center",
		paddingHorizontal: 2,
	},
});

function ShippingManifestPDF({ details }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.headerContainer}>
					<Image
						style={styles.logoImage}
						src={process.env.REACT_APP_PDF_AHS_LOGO}
					/>
					<View style={styles.companyAddressContainer}>
						<Text style={styles.heading}>SHIPPING MANIFEST</Text>
						<Text style={{ fontWeight: "bold" }}>
							Azure Hospitality Supply
						</Text>
						<Text>
							{process.env.REACT_APP_COMPANY_ADDRESS_LINE1}
						</Text>
						<Text>
							{process.env.REACT_APP_COMPANY_ADDRESS_LINE2}
						</Text>
					</View>
				</View>
				<View style={styles.shipToAddressSection}>
					<View>
						<Text style={{ fontWeight: "bold", marginBottom: 3 }}>
							Ship To:
						</Text>
						<Text>{details.Customer.DisplayName}</Text>
						<Text>{details.Customer?.BillAddr?.Line1}</Text>
						<Text>
							{details.Customer?.BillAddr?.City},{" "}
							{details.Customer?.BillAddr?.CountrySubDivisionCode}
							, {details.Customer?.BillAddr?.PostalCode}
						</Text>
						<Text style={{ marginTop: 5 }}>
							<Text style={{ fontWeight: "bold" }}>
								Contact Email:{" "}
							</Text>
							{details.Customer?.PrimaryEmailAddr?.Address}
						</Text>
						<Text style={{ marginTop: 5 }}>
							<Text style={{ fontWeight: "bold" }}>
								Contact Phone:{" "}
							</Text>
							{details.Customer?.PrimaryPhone?.FreeFormNumber}
						</Text>
						<Text style={{ marginTop: 5 }}>
							<Text style={{ fontWeight: "bold" }}>
								24 Hour Emergency Contact:{" "}
							</Text>
							{process.env.REACT_APP_EMERGENCY_CONTACT}
						</Text>
					</View>
					<View
						style={{
							marginRight: 43,
							flexDirection: "column",
							gap: 5,
						}}
					>
						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Ship Date:{" "}
							</Text>
							{new Date().toLocaleString()}
						</Text>
						<Text>
							<Text style={{ fontWeight: "bold" }}>
								Purchase Order#:{" "}
							</Text>
							{details.PlacedOrder.Id}
						</Text>
					</View>
				</View>
				<View style={styles.shippingContainer}>
					<View style={styles.shippingMethodRow}>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							NUMBER OF UNITS
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 0.5 },
							]}
						>
							HM
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							TYPE CONTAINER
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 2 },
							]}
						>
							DESCRIPTION AND CLASSIFICATION
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 0.7 },
							]}
						>
							CLASS
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							PRODUCT ID
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							NET WEIGHT
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							GROSS WEIGHT NHM
						</Text>
						<Text
							style={[
								styles.shippingMethodHeaderText,
								{ flex: 1 },
							]}
						>
							GROSS WEIGHT HM
						</Text>
					</View>

					{details.Products.map((item, index) => (
						<View key={index} style={styles.shippingDataRow}>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								{item?.Quantity}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 0.5 }]}
							>
								{item.Hazardous ?? "No"}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								Carton
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 2 }]}
							>
								{item?.Description}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 0.7 }]}
							>
								55.0
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								{item?.SKU}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								{item?.Quantity * item?.Size} {item.SizeUnit}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								{item?.Hazardous
									? item?.Quantity * item?.Size
									: "N/A"}{" "}
								{item?.SizeUnit}
							</Text>
							<Text
								style={[styles.shippingCellData, { flex: 1 }]}
							>
								{!item?.Hazardous
									? item?.Quantity * item?.Size
									: "N/A"}{" "}
								{item?.SizeUnit}
							</Text>
						</View>
					))}
				</View>
				<View
					style={{
						flexDirection: "row",
						fontSize: 8,
						justifyContent: "space-between",
						marginTop: 10,
					}}
				>
					<Text>
						<Text style={{ fontWeight: "bold" }}>TOTAL UNITS: </Text>
						<Text >
							{details.Products.reduce(
								(total, items) => total + items.Quantity,
								0,
							)}
						</Text>
					</Text>
					<View
						style={{
							marginRight: 60,
							flexDirection: "column",
							gap: 5,
						}}
					>
						<Text>
							<Text style={{ fontWeight: "bold" }}>NON HAZARDOUS WEIGHT: </Text>
							<Text >
								{details.Products.reduce((total, item) => {
									if (!item?.Hazardous) {
										if (
											item.SizeUnit !== "GAL" &&
											item.SizeUnit !== "GALLONS"
										) {
											const newSize = convertToGallons(
												item.Size,
												item.SizeUnit,
											);
											return (
												total + item.Quantity * newSize
											);
										}
										return (
											total + item.Quantity * item.Size
										);
									}
									return total;
								}, 0)}{" "}
								GALLONS
							</Text>
						</Text>
						<Text>
							<Text style={{ fontWeight: "bold" }}>HAZARDOUS WEIGHT: </Text>
							<Text>
								{details.Products.reduce((total, item) => {
									if (item?.Hazardous) {
										if (
											item.SizeUnit !== "GAL" &&
											item.SizeUnit !== "GALLONS"
										) {
											const newSize = convertToGallons(
												item.Size,
												item.SizeUnit,
											);
											return (
												total + item.Quantity * newSize
											);
										}
										return (
											total + item.Quantity * item.Size
										);
									}
									return total;
								}, 0)}{" "}
								GALLONS
							</Text>
						</Text>
						<Text>
							<Text style={{ fontWeight: "bold" }}>TOTAL WEIGHT: </Text>
							<Text>
								{details.Products.reduce(
									(total, item) =>
										total + item.Quantity * item.Size,
									0,
								)}{" "}
								GALLONS
							</Text>
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						fontSize: 8,
						marginTop: 15,
					}}
				>
					<View>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ fontWeight: "bold" }}>
								RECIEVED BY:{" "}
							</Text>
							<Text>{details.PlacedOrder.ReceivedBy}</Text>
						</Text>
						<Text style={{ fontWeight: "bold" }}>SIGNATURE: </Text>
						<Image
							style={styles.logoImage}
							src={details.PlacedOrder.SignatureURL}
						/>
					</View>
					<Text style={{ marginBottom: 5 }}>
						<Text style={{ fontWeight: "bold" }}>
							DELIVERED BY:{" "}
						</Text>
						<Text>{details.PlacedOrder.DeliveredBy}</Text>
					</Text>
					<Text style={{ marginBottom: 5 }}>
						<Text style={{ fontWeight: "bold" }}>DATE: </Text>
						<Text>{new Date().toLocaleString()}</Text>
					</Text>
				</View>
			</Page>
		</Document>
	);
}
