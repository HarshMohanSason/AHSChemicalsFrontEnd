import React from "react";
import InputField from "../../InputField";
import "../../../styles/components/admin_panel/input_dialog_views/ProductSkuView.css";

const ProductSkuView = ({ productData, setProductData }) => {
	return (
		<section className="product-sku-view">
			{productData.sizes.map((size, index) => {
				return (
					<InputField
						key={index}
						label={`SKU for the size-${size} ${productData.sizeUnit}`}
						type="text"
						name={`sku-${size}`}
						value={
							productData.skus[index] != null
								? productData.skus[index]
								: ""
						}
						onChange={(e) => {
							const updatedSkus = [...productData.skus];
							if (updatedSkus[index] != null) {
								updatedSkus[index] = e.target.value;
							} else {
								updatedSkus.push(e.target.value);
							}
							setProductData({
								...productData,
								skus: updatedSkus,
							});
						}}
						placeholder="Enter the sku for this product"
						required
						pattern="[A-Za-z0-9\s\-]+"
						maxLength={50}
						title="product name can only contain letters, digits, space or hypen"
					/>
				);
			})}
		</section>
	);
};

export default ProductSkuView;
