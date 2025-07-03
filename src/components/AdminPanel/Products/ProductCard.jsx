import styles from "./ProductCard.module.css";

const ProductCard = ({product, onClicked}) => {
	return (
		<div className={styles.productCard} onClick={onClicked}>
			<img
				src={product.Images?.[0]}
				alt="product-image"
				className={styles.productCardImage}
			/>
			<p className={styles.productName}>{product.Name}</p>
			<div className={styles.brandSkuTextDiv}>
				<p>{product.SKU}</p>
				<span style={{ fontSize: "20px", color: "#777777" }}>•</span>
				<p>{product.Brand}</p>
			</div>
			<p className={styles.productDescription}>{product.Description}</p>
		</div>
	);
};

export {ProductCard}
