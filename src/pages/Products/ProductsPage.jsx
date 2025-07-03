import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/AdminPanel/Products/ProductCard";
import { ProductFilters } from "../../components/AdminPanel/Products/ProductFilters";
import { useProductsContext } from "../../contexts/ProductsContext";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
	const navigate = useNavigate();
	const productsProvider = useProductsContext();
	const products = productsProvider.filteredProducts ?? [];

	return (
		<section className={styles.productsPageSection}>
			<ProductFilters
				productFilters={productsProvider.filters}
				toggleFilter={productsProvider.toggleFilter}
			/>
			<section className={styles.productsSection}>
				<section className={styles.productsRow}>
					{products.map((product) => (
						<ProductCard
							key={product.Id}
							product={product}
							onClicked={() =>
								navigate(`/products/${product.Slug}`)
							}
						/>
					))}
				</section>
			</section>
		</section>
	);
};

export default ProductsPage;
