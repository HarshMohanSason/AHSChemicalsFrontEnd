import React from "react";
import "../styles/pages/AdminPanel.css";

function AdminPanel(){
	return(
		<section className="admin-panel">
			<menu className="admin-panel-menu">
				<button className="panel-button">Edit Products</button>
				<button className="panel-button">Accounts</button>
				<button className="panel-button">Orders</button>
			</menu>
			<p>Hello</p>
		</section>
		);
}

export default AdminPanel;