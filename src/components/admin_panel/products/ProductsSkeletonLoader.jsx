import React from "react";
import "../../../styles/components/admin_panel/products/ProductsSkeletonLoader.css";

export const ProductsSkeletonLoader = () => {
	return (
		<div className="products-skeleton-loader">
			<aside className="skeleton-filters">
				<div className="skeleton-filter-main-heading"></div>
				<div className="skeleton-filter-types">
					<div className="skeleton-filter-type-heading"></div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
				</div>
				<div className="skeleton-filter-types">
					<div className="skeleton-filter-type-heading"></div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
					<div className="skeleton-filter-options">
						<div className="skeleton-checkbox-circular"></div>
						<div className="skeleton-filter-name"></div>
					</div>
				</div>
			</aside>
			<section className="skeleton-products">
				<div className="skeleton-product-card">
					<div className="skeleton-image-wrapper">
						<div className="skeleton-product-image"></div>
						<div className="skeleton-edit-button"></div>
					</div>
					<div className="skeleton-product-title"></div>
					<div className="skeleton-product-description"></div>
				</div>
				<div className="skeleton-product-card">
					<div className="skeleton-image-wrapper">
						<div className="skeleton-product-image"></div>
						<div className="skeleton-edit-button"></div>
					</div>
					<div className="skeleton-product-title"></div>
					<div className="skeleton-product-description"></div>
				</div>
				<div className="skeleton-product-card">
					<div className="skeleton-image-wrapper">
						<div className="skeleton-product-image"></div>
						<div className="skeleton-edit-button"></div>
					</div>
					<div className="skeleton-product-title"></div>
					<div className="skeleton-product-description"></div>
				</div>
				<div className="skeleton-product-card">
					<div className="skeleton-image-wrapper">
						<div className="skeleton-product-image"></div>
						<div className="skeleton-edit-button"></div>
					</div>
					<div className="skeleton-product-title"></div>
					<div className="skeleton-product-description"></div>
				</div>
			</section>
		</div>
	);
};
