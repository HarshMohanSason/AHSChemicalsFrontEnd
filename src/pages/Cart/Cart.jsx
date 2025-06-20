import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../contexts/CartContext";
import { useOrders } from "../../hooks/AdminPanel/Orders/UserOrders";
import {
	getUserFirestoreInfo,
	handleFirebaseError,
} from "../../utils/firebase/firebase_utility";
import { useAuth } from "../../contexts/AuthContext";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import DOMPurify from "dompurify";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
const Cart = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { alert } = useAlertContext();
	const [properties, setSelectedProperties] = useState([]);
	const [selectedProperty, setSelectedProperty] = useState(null);
	const {
		cartItems,
		isFetchingCartItems,
		updateItemInCart,
		convertCartItemsToAnOrder,
	} = useCartContext();

	const [specialInstructionsText, setSpecialInstructionsText] = useState("");
	const { placeOrder } = useOrders();
	const loadingOverlay = useLoadingOverlayContext();
	const dialogRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (user) {
					const additionalUserInfo = await getUserFirestoreInfo(
						user.uid,
					);
					if (additionalUserInfo) {
						setSelectedProperties(additionalUserInfo.properties);
						setSelectedProperty(properties?.[0]);
					}
				}
			} catch (error) {
				alert.showAlert(handleFirebaseError(error), "Error");
			}
		};

		fetchData();
	}, [user, properties]);

	return (
		<section className="cart-section">
			{cartItems.length === 0 && (
				<section className="empty-cart-section">
					<FontAwesomeIcon
						icon={faShoppingCart}
						className="cart-icon"
					/>
					<h2>Your Cart Is Currently Empty!</h2>
					<p>
						Before you proceed to checkout, you need to add some
						items to your cart. You can view the products at the
						products page
					</p>
					<button onClick={() => navigate("/products")}>
						Return To Products
					</button>
				</section>
			)}
			{cartItems.length !== 0 && (
				<section className="cart-display-section">
					<h1 className="cart-header-text">Your Cart</h1>
					{cartItems.map((item, index) => (
						<div className="cart-item" key={index}>
							<figure>
								<img src={item.image} alt={item.name} />
								<div className="cart-item-buttons">
									<button
										onClick={() => {
											updateItemInCart(item, true);
										}}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => {
											updateItemInCart(item);
										}}
									>
										+
									</button>
								</div>
							</figure>
							<div className="cart-item-info">
								<h1>{item.name}</h1>
								<h2>{item.brand}</h2>
								<h3>SKU: {item.sku}</h3>
								<h4>
									Size: {item.size} {item.sizeUnit}
								</h4>
								<p>Description:</p>
								<div
									className="product-description"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											item.description,
										),
									}}
								></div>
							</div>
						</div>
					))}
					<button
						onClick={() => dialogRef.current.showModal()}
						className="proceed-to-order-button"
					>
						Proceed to order
					</button>
				</section>
			)}
			<dialog ref={dialogRef} className="property-input-dialog">
				<h1>Enter any comments or special instructions </h1>
				<textarea rows = {20} cols= {20} onChange={(e)=> setSpecialInstructionsText(e.target.value)}></textarea>
				<h2>Which property do you want to place an order for</h2>
				{properties.length > 0 &&
					properties.map((property, index) => (
						<select
							key={index}
							onChange={(e) =>
								setSelectedProperties(e.target.value)
							}
						>
							<option value={property}>
								{property.street},{property.city},
								{property.state},{property.postal}
							</option>
						</select>
					))}
				<div className="property-input-dialog-buttons-div">
					<button onClick={() => dialogRef.current.close()}>
						Cancel
					</button>
					<button
						className="place-order-button"
						onClick={async () => {
							if (!selectedProperty) {
								alert.showAlert(
									"You need to select a property before placing the order",
								);
								return;
							}
							loadingOverlay.trigger();
							const order =
								await convertCartItemsToAnOrder(
									selectedProperty,
									specialInstructionsText,
								);
							await placeOrder(order, selectedProperty);
							loadingOverlay.hide()
						}}
					>
						Place the order
					</button>
				</div>
			</dialog>

		</section>
	);
};
export default Cart;
