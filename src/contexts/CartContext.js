import { createContext, useContext } from "react";
import { useCart } from "../hooks/Products/UseCart";

const CartContext = createContext();

export default function CartProvider({ children }){
	const cart = useCart()

	return (
		<CartContext.Provider
			value={cart}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);
