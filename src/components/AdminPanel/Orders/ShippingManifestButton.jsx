import { useNavigate } from "react-router-dom";

export const ShippingManifestButton = ({ order }) => {
	const navigate = useNavigate();

	if (order.Status === "APPROVED") {
		return (
			<button
				onClick={() =>
					navigate(`/order-delivery-signature/${order.Id}`)
				}
			>
				Generate Shipping Manifest
			</button>
		);
	}

	return (
		<button
			disabled
			title="Change status to 'DELIVERED' to generate shipping manifest"
		>
			Generate Shipping Manifest
		</button>
	);
};
