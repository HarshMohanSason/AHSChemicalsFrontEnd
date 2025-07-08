import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css"; // updated to use CSS Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../contexts/CartContext";
import { CartPlaceOrderPopup } from "../../components/Cart/CartPlaceOrderPopup";
import { useCustomersContext } from "../../contexts/CustomersContext";
import { useOrdersCreation } from "../../hooks/AdminPanel/Orders/UseOrdersCreation";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import { useAlertContext } from "../../contexts/AlertBoxContext";

const Cart = () => {
	const navigate = useNavigate();
	const customersProvider = useCustomersContext();
	const { createOrder, createPurchaseOrder } = useOrdersCreation();
	const cartProvider = useCartContext();
	const loadingOverlay = useLoadingOverlayContext();
	const { alert } = useAlertContext();
	const cartPlaceOrderPopupRef = useRef(null);

	const [specialInstructions, setSpecialInstructions] = useState("");
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	// Setting the selectedCustomer as a default value
	useEffect(() => {
		if (
			!selectedCustomer &&
			customersProvider?.formattedCustomersForDisplay?.length > 0
		) {
			setSelectedCustomer(
				customersProvider.formattedCustomersForDisplay[0],
			);
		}
	}, [customersProvider.formattedCustomersForDisplay]);

	if (cartProvider.isFetchingCartItems) {
		return <p>Loading Cart ... </p>;
	}

	if (cartProvider.cartItems?.length === 0) {
		return (
			<section className={styles.emptyCartSection}>
				<FontAwesomeIcon
					icon={faShoppingCart}
					className={styles.cartIcon}
				/>
				<h2>Your Cart Is Currently Empty!</h2>
				<p>
					Before you proceed to checkout, you need to add some items
					to your cart. You can view the products at the products page
				</p>
				<button onClick={() => navigate("/products")}>
					Return To Products
				</button>
			</section>
		);
	}

	return (
		<section className={styles.cartSection}>
			{cartProvider?.cartItems?.length !== 0 && (
				<section className={styles.cartDisplaySection}>
					{cartProvider?.cartItems?.map((item, index) => (
						<div className={styles.cartItem} key={item.Id}>
							<img src={item?.Images?.[0]} alt={item.Name} />
							<div className={styles.cartItemInfo}>
								<h1>{item.Name}</h1>
								<h2>
									{item.SKU} • {item.Size}{" "}
									{item.SizeUnit.toLowerCase()} (Pack of{" "}
									{item.PackOf})
								</h2>
								<p className={styles.productDescription}>
									{item.Description}
								</p>
								<div className={styles.cartItemButtons}>
									<button
										onClick={() =>
											cartProvider.updateQuantityInCart(
												index,
												true,
											)
										}
									>
										-
									</button>
									<span
										style={{
											fontSize: "20px",
											fontWeight: "600",
										}}
									>
										{item.Quantity}
									</span>
									<button
										onClick={() =>
											cartProvider.updateQuantityInCart(
												index,
											)
										}
									>
										+
									</button>
								</div>
							</div>
							<button
								className={styles.deleteCartItemButton}
								onClick={async () =>
									await cartProvider.deleteItemFromCart(item)
								}
							>
								&times;
							</button>
						</div>
					))}
					<button
						onClick={() =>
							cartPlaceOrderPopupRef.current.showModal()
						}
						className={styles.proceedToOrderButton}
					>
						Proceed to order
					</button>
				</section>
			)}
			<CartPlaceOrderPopup
				dialogRef={cartPlaceOrderPopupRef}
				selectedCustomer={selectedCustomer}
				setSelectedCustomer={setSelectedCustomer}
				specialInstructions={specialInstructions}
				setSpecialInstructions={setSpecialInstructions}
				placeOrder={async () => {
					loadingOverlay.trigger();
					try {
						const orderDetails = {
							Items: cartProvider.cartItems,
							SpecialInstructions: specialInstructions,
							Customer: selectedCustomer,
						};
						const createdOrderDetails =
							await createOrder(orderDetails);
						const order = {
							PlacedOrder: createdOrderDetails,
							Customer: selectedCustomer,
							Items: cartProvider.cartItems,
						};
						await createPurchaseOrder(order);
						await cartProvider.clearCart();
						alert.showAlert(
							"Your order was successfully placed. You can check the status of your order in your account.",
							"Success",
						);
					} catch (error) {
						alert.showAlert(error.message, "Error");
					} finally {
						loadingOverlay.hide();
					}
				}}
			/>
		</section>
	);
};

export default Cart;
