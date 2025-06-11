import { useState } from "react"


const useCart = () => {
	const [cartItems, setCartItems] = useState([])

	const addItem = ({product}) => {
		const prevItems = [...cartItems]
		prevItems.push(cartItems)
		setCartItems(prevItems)
	}

	const removeItem = () => {
		if (cartItems.length > 0){
			const prevItems = [...cartItems]
			prevItems.pop()
			setCartItems(prevItems)
		}
	}
}