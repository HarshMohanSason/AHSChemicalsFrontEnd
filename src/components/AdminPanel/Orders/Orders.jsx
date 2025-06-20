import { useOrders } from "../../../hooks/AdminPanel/Orders/UserOrders";
import styles from "./Orders.module.css";
import OrdersSkeletonLoader from "../../SkeletonLoaders/OrdersSkeletonLoader";

const Orders = () => {
	const { fetchedOrders, isFetchingOrders } = useOrders();

	return (
		<section className={styles.ordersSection}>
			<section className={styles.topSection}>
				<h1 className={styles.fetchedOrdersLength}>
					All Orders ({fetchedOrders?.length})
				</h1>
				<div className={styles.syncExportOrderDiv}>
					<button className={styles.syncOrdersButton}>
						+Sync Orders
					</button>
					<button className={styles.exportDetailsButton}>
						Export Details
					</button>
				</div>
			</section>

			<section className={styles.filtersSection}>
				<button>Filter By Date</button>
				<button>Filter By Order Status</button>
				<button>Filter By Accept Status</button>
				<button>Filter By Payment Status</button>
				<button>Filter By Amount</button>
			</section>

			<section className={styles.orderDisplaySection}>
				<div className={styles.tableWrapper}>
					<table className={styles.orderTable}>
						<thead className={styles.orderTableHead}>
							<tr>
								{[
									"Order ID",
									"Order Status",
									"Accept Status",
									"Payment Status",
									"Total",
									"Date",
									"Purchase Order",
								].map((header) => (
									<th key={header}>{header}</th>
								))}
							</tr>
						</thead>
						{isFetchingOrders && (
							<OrdersSkeletonLoader ordersLength={5} />
						)}
						{!isFetchingOrders && fetchedOrders.length > 0 && (
							<tbody className={styles.orderTableBody}>
								{fetchedOrders.map((order) => (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.status}</td>
										<td>{order.accept_status}</td>
										<td>{order.payment_status}</td>
										<td>${order.total_amount}</td>
										<td>
											{order.timestamp
												.toDate()
												.toLocaleString() || "-"}
										</td>
										<td>
											<a
												href={order.purchase_order_url}
												target="_blank"
												rel="noopener noreferrer"
											>
												View PDF
											</a>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
				</div>
			</section>
		</section>
	);
};

export default Orders;
