import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
	const navigate = useNavigate();

	return (
		<section className="cart-section">
			<section className="empty-cart-section">
				<FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
				<h2>Your Cart Is Currently Empty!</h2>
				<p>
					Before you proceed to checkout, you need to add some items
					to your cart. You can view the products at the products page
				</p>
				<button onClick={() => navigate("/products")}>
					Return To Products
				</button>
			</section>
		</section>
	);
};
export default Cart;
