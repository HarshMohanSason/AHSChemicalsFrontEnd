import { useEffect, useState, useCallback } from "react";
import { fetchProductsFromFirestore } from "../utils/firebase/firebase_utility";

export const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch products from Firestore
	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			const fetched = await fetchProductsFromFirestore("products");
			setProducts(fetched);
			setFilteredProducts(fetched); 
		} catch (error) {
			setError(error.message || "Error fetching the products");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Filter products whenever filters or products change
	useEffect(() => {
		const filtered = products.filter((product) => {
			const brand = product.brandName?.toLowerCase() || "";
			const type = product.type?.toLowerCase() || "";
			const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
			const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type);
			return matchesBrand && matchesType;
		});
		setFilteredProducts(filtered);
	}, [products, selectedBrands, selectedTypes]);

	// Toggle selected brand
	const handleBrandChange = (brand) => {
		setSelectedBrands((prev) =>
			prev.includes(brand)
				? prev.filter((b) => b !== brand)
				: [...prev, brand]
		);
	};

	// Toggle selected type
	const handleTypeChange = (type) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((t) => t !== type)
				: [...prev, type]
		);
	};

	//Filter out duplicates if any 
	const brands = [...new Set(products.map((p) => p.brandName?.toLowerCase() || ""))].filter(Boolean);
	const types = [...new Set(products.map((p) => p.type?.toLowerCase() || ""))].filter(Boolean);

	return {
		filteredProducts,
		loading,
		error,
		handleBrandChange,
		handleTypeChange,
		brands,
		types,
	};
}; 