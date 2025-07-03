import { createContext, useContext } from "react";
import useProducts from "../hooks/Products/UseProducts";
const ProductsContext = createContext();

export default function ProductsProvider({ children }){
	const productsProvider = useProducts();

	return (
		<ProductsContext.Provider
			value={productsProvider}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProductsContext = () => useContext(ProductsContext);
