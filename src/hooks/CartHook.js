import React, { useEffect, useState } from "react";
import { fetchCartItems, handleFirebaseError } from "../utils/firebase/firebase_utility";
import { useAuth } from "../utils/firebase/AuthContext";
import { useProducts } from "./ProductsHook";
import useAlert from "./UseAlertHook";

export const useCart = () => {
	const [cartItems, setCartItems] = useState([]);
	const { user } = useAuth();
	const { products } = useProducts();
	const { showAlert } = useAlert();
	
	const loadCartItems = async () => {
		try {
			if (user) {
				const items = await fetchCartItems(user.uid);
				const userAddedProducts = products.filter(
					(product) => items.some((item) => item.id == product.id)
				);
				setCartItems(userAddedProducts)
			}
		} catch(error) {
			showAlert(handleFirebaseError(error), "Error")
		} 
	};

	const addCartItem = (item) => {
		const prevList = [...cartItems];
		prevList.push(item);
		setCartItems(prevList);
	};

	const decreaseCartItem = (item) => {
		const newItems = cartItems.filter((val) => val.id !== item.id);
		setCartItems(newItems);
	};

	useEffect(() => {}, [cartItems]);

	return { cartItems, addCartItem, decreaseCartItem };
};
