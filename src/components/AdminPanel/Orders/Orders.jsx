import { useState } from "react";
import styles from "./Orders.module.css";
import { useEffect } from "react";
import { faCancel, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { InvoiceButton } from "./InvoiceButton";
import { ShippingManifestButton } from "./ShippingManifestButton";
import PurchaseOrderButton from "./PurchaseOrderButton";
import { useOrdersManagement } from "../../../hooks/AdminPanel/Orders/UseOrdersManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Orders = () => {
	const {
		isFetchingOrders,
		filteredOrders,
		maxAmountFilter,
		minAmountFilter,
		statusFilter,
		filterOrders,
		setStatusFilter,
		setMaxAmountFilter,
		setMinAmountFilter,
		minDateFilter,
		setMinDateFilter,
		maxDateFilter,
		setMaxDateFilter,
		updateEditedOrder,
	} = useOrdersManagement();

	const [orderToEdit, setOrderToEdit] = useState(null);

	useEffect(() => {
		filterOrders();
	}, [
		minAmountFilter,
		maxAmountFilter,
		statusFilter,
		minDateFilter,
		maxDateFilter,
	]);

	if (isFetchingOrders) return <p>Loading...</p>;
	return (
		<section className={styles.ordersSection}>
			<section className={styles.topSection}>
				<h1 className={styles.fetchedOrdersLength}>
					All Orders ({filteredOrders.length})
				</h1>
				<div className={styles.syncExportOrderDiv}>
					<button className={styles.exportDetailsButton}>
						Export Details
					</button>
				</div>
			</section>

			<section className={styles.filtersSection}>
				<div className={styles.dateFilterGroup}>
					<label>Start Date</label>
					<input
						type="date"
						onChange={(e) => setMinDateFilter(e.target.value)}
						placeholder="Start Date"
					/>
					{/* Max Date Filter */}
					<label>End Date</label>
					<input
						type="date"
						onChange={(e) => setMaxDateFilter(e.target.value)}
						placeholder="End Date"
					/>
				</div>
				<select onChange={(e) => setStatusFilter(e.target.value)}>
					<option value="PENDING">PENDING</option>
					<option value="APPROVED">APPROVED</option>
					<option value="CANCELLED">CANCELLED</option>
					<option value="DELIVERED">DELIVERED</option>
				</select>
				<div className={styles.amountFilterGroup}>
					<input
						type="number"
						placeholder="Min Amount"
						onChange={(e) =>
							setMinAmountFilter(Number(e.target.value))
						}
					/>
					<span>to</span>
					<input
						type="number"
						placeholder="Max Amount"
						onChange={(e) =>
							setMaxAmountFilter(Number(e.target.value))
						}
					/>
				</div>
			</section>

			<section className={styles.orderDisplaySection}>
				<div className={styles.tableWrapper}>
					<table className={styles.orderTable}>
						<thead className={styles.orderTableHead}>
							<tr>
								{[
									"Order ID",
									"Status",
									"Total",
									"Date",
									"Purchase Order",
									"Shipping Manifest",
									"Invoice",
									"Edit",
								].map((header) => (
									<th key={header}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody className={styles.orderTableBody}>
							{filteredOrders.map((order) => (
								<tr key={order.Id}>
									<td>{order.Id}</td>
									<td>
										{orderToEdit?.Id === order.Id ? (
											<select
												value={orderToEdit.Status}
												onChange={(e) =>
													setOrderToEdit({
														...orderToEdit,
														Status: e.target.value,
													})
												}
											>
												<option value="PENDING">
													PENDING
												</option>
												<option value="APPROVED">
													APPROVED
												</option>
												<option value="CANCELLED">
													CANCELLED
												</option>
												<option value="DELIVERED">
													DELIVERED
												</option>
											</select>
										) : (
											order.Status
										)}
									</td>
									<td>${order.Total}</td>
									<td>
										{order.TimePlaced.toDate().toLocaleString() ||
											"-"}
									</td>
									<td>
										<PurchaseOrderButton
											order={order}
											orderToEdit={orderToEdit}
											onClicked={()=> {
												setOrderToEdit(order);
											}}
										/>
									</td>
									<td>
										<ShippingManifestButton
											key={order.Id}
											order={order}
											onCaptureSignature={() => {
												//setOrderToEdit(order);
												//signatureDialogRef.current.showModal();
											}}
										/>
									</td>
									<td>
										<InvoiceButton
											order={order}
											key={order.Id}
										/>
									</td>
									<td>
										{orderToEdit?.Id === order.Id ? (
											<div
												style={{
													display: "flex",
													gap: "5px",
												}}
											>
												<button
													onClick={async () => {
														await updateEditedOrder(
															order,
															orderToEdit,
														);
														setOrderToEdit(null);
													}}
													className={
														styles.saveButton
													}
													title="Save Changes"
												>
													<FontAwesomeIcon
														icon={faCheck}
													/>
												</button>
												<button
													onClick={() =>
														setOrderToEdit(null)
													}
												>
													<FontAwesomeIcon
														icon={faCancel}
													/>
												</button>
											</div>
										) : (
											<button
												onClick={() =>
													setOrderToEdit(order)
												}
												className={styles.kebabMenu}
												title="Edit Order"
											>
												<FontAwesomeIcon
													icon={faEdit}
												/>
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</section>
	);
};

export default Orders;
