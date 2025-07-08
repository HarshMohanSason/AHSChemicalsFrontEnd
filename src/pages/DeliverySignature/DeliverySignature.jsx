import { useParams } from "react-router-dom";
import { useState } from "react";
import SignaturePad from "../../components/SignaturePad/SignaturePad";
import styles from "./DeliverySignature.module.css";
import InputField from "../../components/InputField/InputField";
import { getGeneratedShippingManifest } from "../../utils/PdfGeneration/GenerateShippingManifest";
import {
	fetchSingleOrder,
	updateOrderItemsInFirestore,
} from "../../utils/Firebase/Orders";
import { useOrdersCreation } from "../../hooks/AdminPanel/Orders/UseOrdersCreation";
import { uploadSingleFileToStorage } from "../../utils/Firebase/FirebaseStorage";

const DeliverySignature = () => {
	const { orderId } = useParams();
	const { createMappedCustomerAndProductOrder } = useOrdersCreation();
	const [step, setStep] = useState("signature");
	const [receivedBy, setReceivedBy] = useState("");
	const [deliveredBy, setDeliveredBy] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const placedOrder = await fetchSingleOrder(orderId);
		placedOrder.ReceivedBy = receivedBy;
		placedOrder.DeliveredBy = deliveredBy;
		const mappedObject =
			await createMappedCustomerAndProductOrder(placedOrder);
		const blob = await getGeneratedShippingManifest(mappedObject);
		const shippingManifestPath = `orders/${orderId}/shipping_manifest.pdf`;
		const shippingManifestURL = await uploadSingleFileToStorage(
			blob,
			shippingManifestPath,
		);
		await updateOrderItemsInFirestore(orderId, {
			ShippingManifestURL: shippingManifestURL,
		});
		setStep("Finished");
	};
	return (
		<section className={styles.orderSignaturePage}>
			{step === "signature" && (
				<SignaturePad
					orderID={orderId}
					onSave={(url) => {
						setStep("form");
					}}
				/>
			)}

			{step === "form" && (
				<form className={styles.formContainer} onSubmit={handleSubmit}>
					<InputField
						placeholder={"Received By: "}
						required
						title={"Only one space and letters are allowed"}
						pattern="^[A-Za-z]+( [A-Za-z]+)?$"
						value={receivedBy}
						onChange={(e) => setReceivedBy(e.target.value)}
					/>
					<InputField
						placeholder={"Delivered By:"}
						required
						title={"Only one space and letters are allowed"}
						pattern="^[A-Za-z]+( [A-Za-z]+)?$"
						value={deliveredBy}
						onChange={(e) => setDeliveredBy(e.target.value)}
					/>
					<button type="submit">Submit</button>
				</form>
			)}
			
		</section>
	);
};

export default DeliverySignature;
