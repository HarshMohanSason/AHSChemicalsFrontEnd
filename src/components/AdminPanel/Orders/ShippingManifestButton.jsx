export const ShippingManifestButton = ({ order, onCaptureSignature }) => {
	if (order.status === "DELIVERED") {
		return (
			<button
				onClick={() => {
					onCaptureSignature(); 
				}}
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