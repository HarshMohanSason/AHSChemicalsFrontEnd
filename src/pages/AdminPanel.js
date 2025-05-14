import React, { useState } from "react";
import "../styles/pages/AdminPanel.css";
import Products from "../components/admin_panel/products/Products";

function AdminPanel(){

	const [currentMenuOption, setMenuOption] = useState("products");

	return(
		<section className="admin-panel">
			<menu className="admin-panel-menu">
				<button className={currentMenuOption === "products" ? 'active': ''} onClick={()=> setMenuOption("products")}>Products</button>
				<button className={currentMenuOption === "accounts" ? 'active': ''} onClick={()=> setMenuOption("accounts")}>Accounts</button>
				<button className={currentMenuOption === "orders" ? 'active': ''} onClick={()=> setMenuOption("orders")}>Orders</button>
			</menu>
		{currentMenuOption === "products" && <Products />}
		</section>
		);
}


export default AdminPanel;