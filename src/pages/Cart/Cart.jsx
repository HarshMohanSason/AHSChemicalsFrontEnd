import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../contexts/CartContext";
import { useOrders } from "../../hooks/AdminPanel/Orders/UserOrders";
import handleGeneratePdf from "../../utils/PdfGeneration/GeneratePurchaseOrder";

const Cart = () => {
	const navigate = useNavigate();
	const {
		cartItems,
		isFetchingCartItems,
		updateItemInCart,
		convertCartItemsToAnOrder,
	} = useCartContext();

	const {placeOrder} = useOrders();

	useEffect(() => {
		if (isFetchingCartItems) {
		}
	}, [isFetchingCartItems]);

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
					{cartItems.map((item, index) => (
						<div className="cart-item" key={index}>
							<figure>
								<img src={item.image} alt={item.name} />
								<div className="cart-item-buttons">
									<button
										onClick={() => {
											updateItemInCart(item, true)	
										}}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => {
											updateItemInCart(item)	
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
							</div>
						</div>
					))}
					<button className="place-order-button" onClick={()=> placeOrder(convertCartItemsToAnOrder())}>
						Place your order
					</button>
					<button onClick={()=> handleGeneratePdf(convertCartItemsToAnOrder())}>Generate Purchase Order</button>
				</section>
			)}
		</section>
	);
};
export default Cart;
