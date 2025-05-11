import React from "react";
import "../styles/components/LoadingOverlay.css"

export const LoadingOverlay = ({ showOverlay }) => {
	return (
		<>
			{showOverlay && (
				<div className="loading-overlay">
					<div className="spinner"></div>
				</div>
			)}
		</>
	);
}

