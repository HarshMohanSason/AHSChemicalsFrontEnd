import React from "react";
import Products from "../../components/AdminPanel/Products/Products";
import "./ProductsPage.css";

const ProductsPage = () => {

	return (
		<section className="product-page">
			<Products hideAddProductSection={true} productTileButtonText={"Add"}/>
		</section>
	);
};

export default ProductsPage;
