import React from "react";
import InputField from "../../InputField";
import "../../../styles/components/admin_panel/input_dialog_views/ProductSizesView.css";

const ProductSizesView = ({ productData, setProductData }) => {
	const addSize = () => {
		const oldSizes = [...productData.sizes];
		oldSizes.push("");
		setProductData({ ...productData, sizes: oldSizes });
	};

	const removeSize = () => {
		const oldSizes = [...productData.sizes];
		oldSizes.pop();
		setProductData({ ...productData, sizes: oldSizes });
	};

	return (
		<section className="input-dialog-product-sizes-view">
			{productData.sizes.map((size, index) => {
				return (
					<InputField
						key={index}
						label={`Size ${index + 1}`}
						type="tel"
						name={`size${index + 1}`}
						value={size}
						onChange={(e) => {
							const updatedChanges = [...productData.sizes];
							updatedChanges[index] = e.target.value;
							setProductData({
								...productData,
								sizes: updatedChanges,
							});
						}}
						placeholder="Enter a size (only digits and decmials)"
						required
						pattern="^\d+(\.\d+)?$"
						maxLength={10}
						title="Sizes can only contain digits and one decimal point"
					/>
				);
			})}
			<div className="size-action-button-div">
				<button className="size-action-button" onClick={addSize} type="button">
					+
				</button>
				{productData.sizes.length > 1 && (
					<button className="size-action-button" onClick={removeSize} type="button">
						-
					</button>
				)}
			</div>
			<select
				value={productData.sizeUnit}
				onChange={(e) =>
					setProductData({ ...productData, sizeUnit: e.target.value })
				}
			>
				<option value="Gallons">Gallons</option>
				<option value="Litres">Litres</option>
				<option value="Kilograms">Kilograms</option>
			</select>
		</section>
	);
};

export default ProductSizesView;
