import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleProduct.css";
import DOMPurify from "dompurify";
import { useCartContext } from "../../contexts/CartContext";

const SingleProduct = () => {
	const { state } = useLocation();
	const product = state?.product;

	const [selectedImage, setSelectedImage] = useState(
		product?.images?.[0] || "",
	);
	const {
		addItemsToCart,
		handleIncreaseInVariant,
		handleDecreaseInVariant,
		setSelectedVariants,
		selectedVariants,
		resetVariants,
	} = useCartContext({ product });

	useEffect(() => {
		if (product?.variants) {
			const newVariants = product.variants.map((variant) => ({
				...variant,
				productId: product.id,
				name: product.name,
				description: product.description,
				brand: product.brand,
				image: product.images[0],
				sizeUnit: product.sizeUnit,
				quantity: 0,
			}));
			setSelectedVariants(newVariants);
		}
	}, [product]);

	return (
		<section className="product-page-section">
			<section className="image-display-section">
				<div className="main-image-div">
					<img src={selectedImage} className="main-image" />
				</div>
				<section className="smaller-images-section">
					{product?.images.map((image, index) => (
						<div key={index} className="smaller-image-div">
							<img
								src={image}
								className="smaller-images"
								onClick={() => setSelectedImage(image)}
							/>
						</div>
					))}
				</section>
			</section>
			<section className="product-information-display-section">
				<h1 className="product-name">{product.name}</h1>
				<h3 className="product-brand">{product.brand}</h3>
				<div
					className="product-description"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(product.description),
					}}
				></div>
				<table>
					<thead>
						<tr>
							<th>SKU</th>
							<th>Size</th>
							<th>Select Quantity</th>
						</tr>
					</thead>
					<tbody>
						{selectedVariants &&
							selectedVariants.map((variant, index) => (
								<tr key={index}>
									<td>{variant.sku}</td>
									<td>
										{variant.size} {product.sizeUnit}
									</td>
									<td>
										{variant.quantity > 0 && (
											<button
												onClick={() =>
													handleDecreaseInVariant(
														variant,
													)
												}
											>
												-
											</button>
										)}
										<span style={{ margin: "0 8px" }}>
											{variant.quantity}
										</span>
										<button
											onClick={() =>
												handleIncreaseInVariant(variant)
											}
										>
											+
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<a href={product.sds} target="_blank" rel="noopener noreferrer">
					View SDS{" "}
				</a>
				<button
					className="add-to-cart-button"
					onClick={() => {
						addItemsToCart();
						resetVariants();
					}}
				>
					Add to Cart
				</button>
			</section>
		</section>
	);
};

export default SingleProduct;
