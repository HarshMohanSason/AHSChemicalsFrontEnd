import React from "react";
import { ImageUploaderContainer } from "../../ImageUploaderContainer";
import "../../../styles/components/admin_panel/input_dialog_views/ProductImageAndSDSView.css";

export default function ProductImageAndSDSView({
	productData,
	setProductData,
}) {
	const updateImageAtIndex = (newImage, index) => {
		const updatedImages = [...productData.images];
		updatedImages[index] = newImage;
		setProductData({ ...productData, images: updatedImages });
	};

	const addImageContainer = () => {
		const oldImages = [...productData.images];
		oldImages.push(null);
		setProductData({ ...productData, images: oldImages });
	};
	const removeImageContainer = () => {
		if (productData.images.length > 1) {
			const oldImages = [...productData.images];
			oldImages.pop();
			setProductData({ ...productData, images: oldImages });
		}
	};

	return (
		<section className="product-image-and-sds-view">
			<section className="image-section">
				{productData.images.map((image, index) => {
					return (
						<ImageUploaderContainer
							key={index}
							image={image}
							updateImage={(image) =>
								updateImageAtIndex(image, index)
							}
						/>
					);
				})}
			</section>
			<div className="size-action-button-div">
				{productData.images.length < 5 && (
					<button
						className="size-action-button"
						type="button"
						onClick={addImageContainer}
					>
						+
					</button>
				)}
				{productData.images.length > 1 && (
					<button
						className="size-action-button"
						type="button"
						onClick={removeImageContainer}
					>
						-
					</button>
				)}
			</div>
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<label style={{ fontSize: "20px" }}>
					Add the Safety Data Sheet(SDS)
				</label>
				<label className="custom-file-upload">
					{productData.sds && typeof productData.sds === "object" ? (
						productData.sds.name //show the file name if its not a http url
					) : productData.sds &&
					  typeof productData.sds === "string" ? (
						// When editing and sds is a URL
						<a
							href={productData.sds}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: "#007bff",
								textDecoration: "underline",
							}}
						>
							View SDS
						</a>
					) : (
						"Upload SDS (PDF)"
					)}
					<input
						type="file"
						accept="application/pdf"
						onChange={(e) => {
							const file = e.target.files[0];
							if (file) {
								setProductData({ ...productData, sds: file });
							}
						}}
					/>
				</label>
			</section>
		</section>
	);
}
