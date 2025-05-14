import React from "react";
import InputField from "../../InputField";
import "../../../styles/components/admin_panel/input_dialog_views/ProductTagsView.css";

export const ProductsTagsView = ({ productData, setProductData }) => {

	const addTag = () => {
		const oldTags = [...productData.tags]
		oldTags.push("")
		setProductData({...productData, tags: oldTags})
	}
	const removeTag = () => {
		const oldTags = [...productData.tags]
		oldTags.pop()
		setProductData({...productData, tags: oldTags})
	}
	console.log(productData.tags);

	return <section className="product-tags-view">
		<div className="tags">
		{productData.tags.map((size, index) => {
			return <InputField
				key={index}
				label={`Tag-${index + 1}`}
				type="text"
				name={`tag${index+1}`}
				value={size}
				required={index === 0 ? true : false} //Only first tag is required 
				placeholder={`Enter only letters`}
				onChange={(e) => {
					const tags = [...productData.tags]
					tags[index] = e.target.value
					setProductData({...productData, tags})
				}}
			/>;
		})}
		</div>
		<div className="size-action-button-div">
			<button
				className="size-action-button"
				onClick={addTag}
				type="button"
			>
				+
			</button>
			{productData.tags.length > 1 && (
				<button
					className="size-action-button"
					onClick={removeTag}
					type="button"
				>
					-
				</button>
			)}
		</div>
	</section>;
};
