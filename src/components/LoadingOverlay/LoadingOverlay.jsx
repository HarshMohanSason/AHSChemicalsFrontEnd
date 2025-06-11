import React from "react";
import styles from "./LoadingOverlay.module.css"

/**
 * LoadingOverlay Component
 *
 * This component renders a full-screen overlay with a loading spinner,
 * typically used to indicate background processing or network activity.
 *
 * Props:
 * @param {boolean} showOverlay - A boolean flag that determines whether the loading overlay is visible.
 *
 * Usage:
 * <LoadingOverlay showOverlay={isLoading} />
 *
 * Note:
 * - Ensure that `LoadingOverlay.module.css` contains styles for `loadingOverlay` and `spinner`.
 * - The component renders nothing if `showOverlay` is `false`, allowing you to conditionally display it.
 */
const LoadingOverlay = ({ showOverlay }) => {
	return (
		<>
			{showOverlay && (
				<div className={styles.loadingOverlay}>
					<div className={styles.spinner}></div>
				</div>
			)}
		</>
	);
}
export default LoadingOverlay;

