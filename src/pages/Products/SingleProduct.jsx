import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./SingleProduct.module.css";
import { useCartContext } from "../../contexts/CartContext";
import { useProductsContext } from "../../contexts/ProductsContext";

const SingleProduct = () => {
	const { slug } = useParams();
	const cartProvider = useCartContext();

	const productsProvider = useProductsContext();
	const [product, setProduct] = useState([]);
	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		const parts = slug.split("-");
		const nameKey = parts.slice(0, -1).join("-");
		const product = productsProvider.getProductFromGroupedProducts(nameKey);
		setProduct(product);
		setSelectedImage(product?.[0]?.Images?.[0]);
	}, []);

	if (!product) return <p>Loading...</p>;

	return (
		<section className={styles.productPageSection}>
			<section className={styles.imageDisplaySection}>
				<div className={styles.mainImageDiv}>
					<img
						src={selectedImage === "" ? null : selectedImage}
						className={styles.mainImage}
						alt="Product"
					/>
				</div>
				<section className={styles.imageCaraouselSection}>
					{product[0]?.Images?.map((image, index) => (
						<div
							className={styles.imageCaraousel}
							key={index}
							onClick={() => setSelectedImage(image)}
						>
							<img
								src={image}
								alt={`caraousel-image-${index + 1}`}
							/>
						</div>
					))}
				</section>
			</section>
			<section className={styles.productDetailsSection}>
				<h1 className={styles.productName}>{product[0]?.Name}</h1>
				<h3 className={styles.productBrand}>{product[0]?.Brand}</h3>
				<p className={styles.productDescription}>
					{product[0]?.Description}
				</p>
				<a
					href={product[0]?.SDS}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.viewSDSLink}
				>
					View SDS
				</a>
				<table className={styles.skuTable}>
					<thead>
						<tr>
							<th>SKU</th>
							<th>Size</th>
							<th>Pack Of</th>
							<th>Add this item</th>
						</tr>
					</thead>
					<tbody>
						{product?.map((item) => (
							<tr key={item.Id}>
								<td>{item.SKU}</td>
								<td>
									{item.Size} {item.SizeUnit.toLowerCase()}
								</td>
								<td>{item.PackOf}</td>
								<td>
									<div className={styles.addItemSkuDiv}>
										{cartProvider.getSKUItemQuantity(item.Id) > 0 && (
											<button
												className={
													styles.cartAddVariantButton
												}
												onClick={() =>
													cartProvider.removeSKUs(
														item,
													)
												}
											>
												-
											</button>
										)}
										{cartProvider.getSKUItemQuantity(item.Id) > 0 && (
											<span>{cartProvider.getSKUItemQuantity(item.Id)}</span>
										)}
										<button
											className={
												styles.cartAddVariantButton
											}
											onClick={() =>
												cartProvider.addSKUs(item)
											}
										>
											+
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button className={styles.addItemsToCartButton} onClick={()=> cartProvider.addItemsToCart()}>
					Add Items to Cart
				</button>
			</section>
		</section>
	);
};

export default SingleProduct;
