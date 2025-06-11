import React from "react";
import useFetchProducts from "../../hooks/Products/UseFetchProducts";
import "./Products.css";
import Products from "../../components/AdminPanel/Products/Products";

const ProductsPage = () => {

	const {products} = useFetchProducts();

	return (
		<section className="product-page">
			<Products hideAddProductSection={true} productTileButtonText={"Add"}/>
		</section>
	);
};

export default ProductsPage;
