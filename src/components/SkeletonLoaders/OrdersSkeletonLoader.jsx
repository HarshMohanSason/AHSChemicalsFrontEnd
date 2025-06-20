import styles from "./OrdersSkeletonLoader.jsx";

const OrdersSkeletonLoader = ({ ordersLength }) => {
	return (
		<tbody>
			{Array.from({ length: ordersLength }).map((_, index) => (
				<tr key={index}>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
					<td>
						<div className={styles.ordersSkeleton}></div>
					</td>
				</tr>
			))}
		</tbody>
	);
};
export default OrdersSkeletonLoader;
