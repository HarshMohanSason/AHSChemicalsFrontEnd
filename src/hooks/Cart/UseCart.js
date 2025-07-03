import { useEffect, useState } from "react";
import {
	clearCartFromFirestore,
	getSavedCartItemsFromFirestore,
	saveCartItemsToFirestore,
} from "../../utils/Firebase/Cart";
import { handleFirebaseError } from "../../utils/Firebase/ErrorHandler";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useAuth } from "../../contexts/AuthContext";

export const useCart = () => {
	const { user } = useAuth();
	const { alert } = useAlertContext();

	const [cartItems, setCartItems] = useState([]);
	const [isFetchingCartItems, setIsFetchingCartItems] = useState(false);
	const [selectedSKUs, setSelectedSKUs] = useState([]);

	const initializeCart = async () => {
		setIsFetchingCartItems(true);
		try {
			if (user) {
				const latestCartItems = await getSavedCartItemsFromFirestore(
					user.uid,
				);
				setCartItems(latestCartItems);
			}
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setIsFetchingCartItems(false);
		}
	};

	//Initialize the cart whenever the user changes
	useEffect(() => {
		initializeCart();
	}, [user]);

	const addSKUs = (item) => {
		const updated = [...selectedSKUs];
		const index = updated.findIndex((sku) => sku.Id === item.Id);
		if (index > -1) {
			if (updated[index].Quantity < 20) {
				updated[index].Quantity += 1;
			}
		} else {
			updated.push({ ...item, Quantity: 1 });
		}
		setSelectedSKUs(updated);
	};

	const removeSKUs = (item) => {
		const updated = [...selectedSKUs];
		const index = updated.findIndex((sku) => sku.Id === item.Id);

		if (index > -1) {
			if (updated[index].Quantity > 1) {
				updated[index].Quantity -= 1;
			} else {
				updated[index].Quantity = 0;
			}
			setSelectedSKUs(updated);
		}
	};

	const getSKUItemQuantity = (id) => {
		const found = selectedSKUs.find((item) => item.Id === id);
		return found ? found.Quantity : 0;
	};

	const addItemsToCart = () => {
		if (selectedSKUs.length === 0) {
			alert.showAlert(
				"No items selected. Please select an item before adding them to the cart",
				"Warning",
			);
			return;
		}
		const updatedCart = [...cartItems];
		selectedSKUs.forEach((sku) => {
			const index = updatedCart.findIndex((item) => item.Id === sku.Id);
			if (index > -1) {
				const totalQuantity =
					updatedCart[index].Quantity + sku.Quantity;
				if (totalQuantity < 40) {
					updatedCart[index].Quantity = totalQuantity;
				}
			} else {
				updatedCart.push(sku);
			}
		});
		if (user) {
			saveCartItemsToFirestore(user.uid, updatedCart)
				.then(() => {
					setCartItems(updatedCart);
					setSelectedSKUs([]);
					alert.showAlert(
						"Items Successfully added to the cart",
						"Success",
					);
				})
				.catch((error) =>
					alert.showAlert(handleFirebaseError(error), "Error"),
				);
		}
	};

	const deleteItemFromCart = async (item) => {
		const filteredCart = cartItems.filter(
			(cartItem) => cartItem.Id !== item.Id,
		);
		if (user) {
			saveCartItemsToFirestore(user.uid, filteredCart)
				.then(() => setCartItems(filteredCart))
				.catch((error) => {
					alert.showAlert(handleFirebaseError(error), "Error");
				});
		}
	};

	const updateQuantityInCart = (index, decrease = false) => {
		const updatedCart = [...cartItems];
		if (decrease) {
			if (updatedCart[index].Quantity >= 1) {
				updatedCart[index].Quantity -= 1;
			}
		} else {
			if (updatedCart[index].Quantity < 40) {
				updatedCart[index].Quantity += 1;
			} else {
				alert.showAlert(
					"You can only add a max quantity of 40 for any item. ",
					"Warning",
				);
			}
		}
		setCartItems(updatedCart);
	};

	const getCartItemCount = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const clearCart = () => {
		setCartItems([]);
		clearCartFromFirestore(user.uid);
	};

	return {
		cartItems,
		isFetchingCartItems,
		getCartItemCount,
		addItemsToCart,
		clearCart,
		addSKUs,
		removeSKUs,
		getSKUItemQuantity,
		updateQuantityInCart,
		deleteItemFromCart,
	};
};
