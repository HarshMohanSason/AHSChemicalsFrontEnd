import React from "react";
import InputField from "../../InputField";
import "../../../styles/components/admin_panel/input_dialog_views/ProductInfoView.css";

const ProductInfoView = ({ productData, setProductData }) => {

	return (
		<section className="input-dialog-product-info-view">
			<InputField
				label={"Brand Name"}
				type="text"
				name="brandName"
				value={productData.brandName}
				onChange={(e) =>
					setProductData({ ...productData, brandName: e.target.value })
				}
				placeholder="Enter a brand name"
				required
				pattern="[A-Za-z\s]+"
				maxLength={15}
				title="brand name can only be letters with space of max length 15 characters"
			/>
			<InputField
				label={"Product Name"}
				type="text"
				name="productName"
				value={productData.name}
				onChange={(e) =>
					setProductData({ ...productData, name: e.target.value })
				}
				placeholder="Enter a product name"
				required
				pattern="[A-Za-z0-9\s\-]+"
				maxLength={50}
				title="product name can only contain letters, digits, space or hypen"
			/>
			<InputField
				label={"Product Type"}
				type="text"
				name="productType"
				value={productData.type}
				onChange={(e) =>
					setProductData({ ...productData, type: e.target.value })
				}
				placeholder="Enter the product type"
				required
				pattern="[A-Za-z\s]+"
				maxLength={15}
				title="product type should only contain letters and spaces."
			/>
		</section>
	);
};

export default ProductInfoView;
