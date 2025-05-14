import { useEffect, useState, useRef } from "react";
import {
	fetchParentCollectionDataFromFirestore,
	handleFirebaseError,
} from "../../../utils/firebase/firebase_utility";
import { ProductsSkeletonLoader } from "./ProductsSkeletonLoader";
import useAlert from "../../../hooks/UseAlertHook";
import DOMPurify from "dompurify";

export const ProductsFilterAndTileSection = () => {
	const [products, setProducts] = useState([]);
	const [showSkeletonLoader, setSkeletonLoader] = useState(false);
	const { showAlert } = useAlert();
	const filterAndProductRef = useRef(null);
	const fetchProducts = async () => {
		setSkeletonLoader(true);
		try {
			const getProducts =
				await fetchParentCollectionDataFromFirestore("products");
			setProducts(getProducts);
			filterAndProductRef.current.style.display = "flex";
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			setSkeletonLoader(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const brands = [...new Set(products.map((p) => p.brandName))];
	const types = [...new Set(products.map((p) => p.type))];

	return (
		<>
			{showSkeletonLoader && <ProductsSkeletonLoader />}
			<section
				ref={filterAndProductRef}
				className="filters-and-product-display-section"
				style={{ display: "none" }}
			>
				<section className="filters-section">
					<h1>Filters</h1>
					<fieldset className="filters-fieldset">
						<legend>Brands</legend>
						{brands.map((brand, index) => {
							return (
								<label key={index}>
									<input type="checkbox" />
									{brand}
								</label>
							);
						})}
					</fieldset>
					<fieldset className="filters-fieldset">
						<legend>Product Types</legend>
						{types.map((type, index) => {
							return (
								<label key={index}>
									<input type="checkbox" />
									{type}
								</label>
							);
						})}
					</fieldset>
				</section>
				<section className="products-display-section">
					{products.map((product, index) => {
						return (
							<div className="product-tile" key={index}>
								<div className="image-wrapper">
									<img
										src={product.images[0]}
										alt="product-image"
									/>
									<button>Edit</button>
								</div>
								<h2>{product.name}</h2>

								<p
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											product.description,
										),
									}}
								/>
							</div>
						);
					})}
				</section>
			</section>
		</>
	);
};
