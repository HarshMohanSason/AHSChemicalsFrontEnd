import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CustomerAccountsSkeletonLoader.module.css";
import React from "react";

const CustomerAccountsSkeletonLoader = ({ accountsLength }) => {
	return (
		<section className={styles.mainSection}>
			{Array.from({ length: accountsLength }).map((_, index) => (
				<div className={styles.accountTile} key={index}>
					<div className={styles.nameAndPropertiesDiv}>
						<div className={styles.name}></div>
						<div className={styles.property}></div>
					</div>
					<FontAwesomeIcon icon={faTrashCan} className={styles.trashIcon}/>
				</div>
			))}
		</section>
	);
};

export default CustomerAccountsSkeletonLoader;