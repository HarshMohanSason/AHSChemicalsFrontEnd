import { useEffect, useState } from "react";
import {
	clearCartFromFirestore,
	findTaxRate,
	getSavedCartItemsFromFirestore,
	handleFirebaseError,
	saveCartItemsToFirestore,
} from "../../utils/firebase/firebase_utility";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useAuth } from "../../contexts/AuthContext";
import { Timestamp } from "firebase/firestore";

export const useCart = () => {
	const [cartItems, setCartItems] = useState([]);
	const { user } = useAuth();
	const { alert } = useAlertContext();
	const [isFetchingCartItems, setIsFetchingCartItems] = useState(false);
	const [selectedVariants, setSelectedVariants] = useState([]);
	
	const initializeCart = async () => {
		try {
			setIsFetchingCartItems(true);
			if (user) {
				const latestCartItems = await getSavedCartItemsFromFirestore(
					user.uid,
				);
				if (latestCartItems !== null || latestCartItems.length === 0) {
					setCartItems(latestCartItems);
				}
			}
		} catch (error) {
			alert.showAlert(
				"Error fetching the cart values, will try again later ",
				"Error",
			);
		} finally {
			setIsFetchingCartItems(false);
		}
	};

	useEffect(() => {
		initializeCart();
	}, [user]);

	const getCartItemCount = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const addItemsToCart = () => {
		const variantsToAdd = selectedVariants.filter((v) => v.quantity > 0);
		if (variantsToAdd.length === 0) {
			alert.showAlert(
				"No items selected. Please select an item before adding them to the cart",
				"Error",
			);
			return;
		}

		// Create a copy of cartItems to update
		const updatedCart = [...cartItems];

		variantsToAdd.forEach((item) => {
			const index = updatedCart.findIndex((ci) => ci.sku === item.sku);
			if (index !== -1) {
				// Same SKU found, update quantity
				updatedCart[index] = {
					...updatedCart[index],
					quantity: updatedCart[index].quantity + item.quantity,
				};
			} else {
				// New SKU -> push to array
				updatedCart.push(item);
			}
		});
		setCartItems(updatedCart);

		if (user) {
			saveCartItemsToFirestore(user.uid, updatedCart).catch((error) => {
				alert.showAlert(handleFirebaseError(error), "Error");
				return;
			});
		}
		alert.showAlert("Items added to cart!", "Success");
	};

	const updateItemInCart = (item, isRemoving = false) => {
		const updatedCart = [...cartItems];
		const index = updatedCart.findIndex((value) => value.sku === item.sku);
		if (index !== -1) {
			if (isRemoving) {
				if (updatedCart[index].quantity <= 0) {
					updatedCart.splice(index, 1);
				} else {
					updatedCart[index].quantity -= 1;
				}
			} else {
				updatedCart[index].quantity += 1;
			}
		}
		setCartItems(updatedCart);
	};

	const clearCart = () => {
		setCartItems([]);
		clearCartFromFirestore(user.uid);
	};

	const handleDecreaseInVariant = (variant) => {
		const index = selectedVariants.findIndex(
			(item) => item.sku === variant.sku,
		);
		if (index !== -1 && selectedVariants[index].quantity > 0) {
			const items = [...selectedVariants];
			items[index].quantity -= 1;
			setSelectedVariants(items);
		}
	};

	const handleIncreaseInVariant = (variant) => {
		const index = selectedVariants.findIndex(
			(item) => item.sku === variant.sku,
		);
		if (index !== -1) {
			const items = [...selectedVariants];
			items[index].quantity += 1;
			setSelectedVariants(items);
		}
	};

	const resetVariants = () => {
		const variants = selectedVariants.map((variant) => ({
			...variant,
			quantity: 0,
		}));
		setSelectedVariants(variants);
	};

	const convertCartItemsToAnOrder = async (selectedProperty, specialInstructions) => {
		try {
			const itemsOrdered = cartItems.map((item) => {
				return {
					product_id: item.product_id,
					product_name: item.name,
					brand: item.brand,
					sku: item.sku,
					size: item.size,
					price: Number(item.price).toFixed(2),
					sizeUnit: item.sizeUnit,
					quantity: item.quantity,
					total: (item.price * item.quantity).toFixed(2),
				};
			});
			const subTotal = Number(
				itemsOrdered
					.reduce(
						(total, item) => total + item.quantity * item.price,
						0,
					)
					.toFixed(2),
			);
			const results = await findTaxRate(selectedProperty.city, selectedProperty.county);
			const taxRate = results[0].rate;
			const totalAmount = (taxRate * subTotal).toFixed(2);
			
			return {
				id: crypto.randomUUID(),
				user_id : user.uid,
				timestamp: Timestamp.fromDate(new Date()),
				status: "PENDING",
				accept_status: "PENDING",
				payment_status: "PENDING",
				items: itemsOrdered,
				subtotal: subTotal,
				tax_rate: taxRate * 100,
				total_amount: totalAmount,
				customer_name: user.displayName,
				customer_phone: user.phoneNumber,
				property: selectedProperty,
				special_instructions: specialInstructions,
			};
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		}
	};
	return {
		cartItems,
		addItemsToCart,
		getCartItemCount,
		clearCart,
		isFetchingCartItems,
		handleIncreaseInVariant,
		handleDecreaseInVariant,
		resetVariants,
		setSelectedVariants,
		selectedVariants,
		updateItemInCart,
		convertCartItemsToAnOrder,
	};
};
