import { LoadingOverlay } from "@mantine/core";
import React from "react";
import ProductsFilterAndTileSection from "../components/admin_panel/products/ProductsFilterAndTileSection";
import "../styles/pages/Products.css"
import { useAuth } from "../utils/firebase/AuthContext";

export default function Products() {
	const {user, isLoading} = useAuth();

	return <section className="product-page">
	 {isLoading && <LoadingOverlay/>}
	 {user && <ProductsFilterAndTileSection />}
	</section>;
}
