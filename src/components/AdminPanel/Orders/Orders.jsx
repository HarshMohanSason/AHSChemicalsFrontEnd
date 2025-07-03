import { useState } from "react";
import styles from "./Orders.module.css";
import OrdersSkeletonLoader from "../../SkeletonLoaders/OrdersSkeletonLoader";
import SignaturePad from "../../SignaturePad/SignaturePad";
import { useEffect, useRef } from "react";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import EditProductQuantity from "./InputDialogWizardViews/EditProductQuantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getGeneratedShippingManifest } from "../../../utils/PdfGeneration/GenerateShippingManifest";
import { InvoiceButton } from "./InvoiceButton";
import { ShippingManifestButton } from "./ShippingManifestButton";
import PurchaseOrderButton from "./PurchaseOrderButton";
import { useOrdersManagement } from "../../../hooks/AdminPanel/Orders/UseOrdersManagement";

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

	const signatureDialogRef = useRef(null);
	const editProductWizardDialog = useRef(null);
	const [editProductWizardCurrentView, setEditProductWizardCurrentView] =
		useState(0);

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

	if (isFetchingOrders) return <OrdersSkeletonLoader ordersLength={5} />;

	const wizardSteps = [
		{
			step: "Edit Order Items",
			view: (
				<EditProductQuantity
					orderToEdit={orderToEdit}
					setOrderToEdit={setOrderToEdit}
				/>
			),
		},
	];
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
								<tr key={order.id}>
									<td>{order.id}</td>
									<td>
										{orderToEdit?.id === order.id ? (
											<select
												value={orderToEdit.status}
												onChange={(e) =>
													setOrderToEdit({
														...orderToEdit,
														status: e.target.value,
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
											order.status
										)}
									</td>
									<td>${order.total}</td>
									<td>
										{order.timestamp
											.toDate()
											.toLocaleString() || "-"}
									</td>
									<td>
										<PurchaseOrderButton
											order={order}
											orderToEdit={orderToEdit}
											onClicked={() =>
												editProductWizardDialog.current.showModal()
											}
										/>
									</td>
									<td>
										<ShippingManifestButton
											key={order.id}
											order={order}
											onCaptureSignature={() => {
												setOrderToEdit(order);
												signatureDialogRef.current.showModal();
											}}
										/>
									</td>
									<td>
										<InvoiceButton
											order={order}
											key={order.id}
										/>
									</td>
									<td>
										{orderToEdit?.id === order.id ? (
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
			<dialog
				ref={signatureDialogRef}
				className={styles.signaturePadDialog}
			>
				<h1>Take Delivery Signature</h1>
				<SignaturePad
					orderID={orderToEdit?.id}
					onSave={async (signatureURL) => {
						const updatedOrder = {
							...orderToEdit,
							signature_url: signatureURL,
						};
						await getGeneratedShippingManifest(updatedOrder);
					}}
				/>
				<button
					className={styles.signaturePadDialogCloseButton}
					onClick={() => signatureDialogRef.current.close()}
				>
					&times;
				</button>
			</dialog>

			<InputDialogWizard
				dialogRef={editProductWizardDialog}
				steps={wizardSteps}
				handleSubmit={() => null}
				currentView={editProductWizardCurrentView}
				setCurrentView={setEditProductWizardCurrentView}
			/>
		</section>
	);
};

export default Orders;
