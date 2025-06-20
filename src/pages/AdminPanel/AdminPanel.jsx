import React, { useState } from "react";
import "./AdminPanel.css";
import Products from "../../components/AdminPanel/Products/Products";
import Accounts from "../../components/AdminPanel/Accounts/Accounts";
import AdminControls from "../../components/AdminPanel/AdminControls/AdminControls";
import Orders from "../../components/AdminPanel/Orders/Orders"; 

const AdminPanel = () => {
	const [currentMenuOption, setMenuOption] = useState("products");

	return (
		<section className="admin-panel">
			{currentMenuOption !== "settings" && (
				<menu className="admin-panel-menu">
					<button
						className={
							currentMenuOption === "products" ? "active" : ""
						}
						onClick={() => setMenuOption("products")}
					>
						Products
					</button>
					<button
						className={
							currentMenuOption === "accounts" ? "active" : ""
						}
						onClick={() => setMenuOption("accounts")}
					>
						Accounts
					</button>
					<button
						className={
							currentMenuOption === "orders" ? "active" : ""
						}
						onClick={() => setMenuOption("orders")}
					>
						Orders
					</button>
					<button
						className={
							currentMenuOption === "adminControls" ? "active" : ""
						}
						onClick={() => setMenuOption("adminControls")}
					>
						Admin Controls
					</button>
				</menu>
			)}

			{currentMenuOption === "products" && (
				<Products productTileButtonText="Edit" />
			)}
			{currentMenuOption === "accounts" && <Accounts />}
			{currentMenuOption === "adminControls" && <AdminControls />}
			{currentMenuOption === "orders" && <Orders />}
		</section>
	);
};

export default AdminPanel;
