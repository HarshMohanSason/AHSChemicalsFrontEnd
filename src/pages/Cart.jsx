import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/CartHook";
import "../styles/pages/Cart.css"

const Cart = () => {
	const {cartItems, addCartItem, decreaseCartItem} = useCart()
	const navigate = useNavigate()

	return (<section className="cart-section">
		 {cartItems.length == 0 && 
		 	<section className="empty-cart-section">
		 		<i className="fas fa-shopping-cart"></i>
		 		<h2>Your Cart Is Currently Empty!</h2>
		 		<p>Before you proceed to checkout, you need to add some items to your cart. You can view the products at the products page</p>
		 		<button onClick={() => navigate("/products")}>Return To Products</button>
		 	</section>
		 }
		 {!cartItems.length == 0 && 
		 	<section className=""></section>
		 }
	</section>);
}
export default Cart;