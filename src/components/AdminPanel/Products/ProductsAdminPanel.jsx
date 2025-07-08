import styles from "./ProductsAdminPanel.module.css";
import { useRef, useState } from "react";
import ImageUploadContainer from "../../ImageUploadContainer/ImageUploadContainer";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import sharedStyles from "../AdminPanel.module.css";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { useProductsContext } from "../../../contexts/ProductsContext";

const ProductsAdminPanel = () => {
	const productsProvider = useProductsContext();
	const editProductRef = useRef(null);
	const sdsInputRef = useRef(null);
	const [currentlyEditingProduct, setCurrentlyEditingProduct] = useState({
		Images: [null],
		Id: null,
		SDS: null,
	});
	const updateImage = (image, index) => {
		const prevImages = [...currentlyEditingProduct.Images];
		prevImages[index] = image;
		if (!prevImages.includes(null)) prevImages.push(null);
		setCurrentlyEditingProduct({
			...currentlyEditingProduct,
			Images: prevImages,
		});
	};

	const removeImage = (indexToRemove) => {
		const updatedImages = currentlyEditingProduct.Images.filter(
			(_, i) => i !== indexToRemove,
		);
		setCurrentlyEditingProduct({
			...currentlyEditingProduct,
			Images: updatedImages,
		});
	};
	const handleSDSChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setCurrentlyEditingProduct((prev) => ({
				...prev,
				SDS: file,
			}));
		}
	};
	return (
		<section className={styles.productsAdminPanelSection}>
			
			<section className={styles.filterAndSyncSection}>
				<button
					title="Syncs the latest products with quickbooks"
					className={sharedStyles.syncIconButton}
					onClick={productsProvider.beginProductsSync}
				>
					<i className="fas fa-sync-alt"></i> Sync Products
				</button>
				<ProductFilters
					productFilters={productsProvider.filters}
					toggleFilter={productsProvider.toggleFilter}
				/>
			</section>

			<section className={styles.productsRow}>
				{productsProvider?.filteredProducts?.length > 0 &&
					productsProvider?.filteredProducts?.map((product) => (
						<ProductCard
							key={product.Id}
							product={product}
							onClicked={() => {
								setCurrentlyEditingProduct({
									Id: product.Id,
									Images: product.Images || [null],
									SDS: product.SDS || null,
								});
								editProductRef.current.showModal();
							}}
						/>
					))}
			</section>

			<dialog ref={editProductRef} className={styles.editProductDialog}>
				<h1 className={styles.editProductDialogHeading}>
					Edit product image/sds
				</h1>
				<section className={styles.editProductSection}>
					<div className={styles.editProductSectionImageDiv}>
						{currentlyEditingProduct.Images.map((image, index) => (
							<ImageUploadContainer
								key={index}
								index={index}
								image={image}
								updateImage={updateImage}
								removeImage={removeImage}
							/>
						))}
					</div>
					<div className={styles.editProductSectionSDSDiv}>
						{currentlyEditingProduct.SDS && (
							<>
								<p
									style={{
										fontSize: "14px",
										color: "#555",
										marginTop: "8px",
									}}
								>
									{typeof currentlyEditingProduct.SDS ===
									"string" ? (
										<>
											<a
												href={
													currentlyEditingProduct.SDS
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												View PDF
											</a>
										</>
									) : (
										currentlyEditingProduct.SDS.name
									)}
								</p>
								{currentlyEditingProduct.SDS && (
									<button
										onClick={() =>
											setCurrentlyEditingProduct({
												...currentlyEditingProduct,
												SDS: null,
											})
										}
									>
										<FontAwesomeIcon icon={faTrashCan} />
									</button>
								)}
							</>
						)}
						{!currentlyEditingProduct.SDS && (
							<button
								className={styles.addProductSDSButton}
								onClick={() => sdsInputRef.current.click()}
							>
								Attach SDS
							</button>
						)}
						<input
							ref={sdsInputRef}
							onChange={handleSDSChange}
							type="file"
							accept="application/pdf"
							style={{ display: "none" }}
						/>
					</div>
					<button
						onClick={() =>
							productsProvider.saveProductEditedChanges(
								currentlyEditingProduct,
							)
						}
						className={styles.editProductSectionSaveChangesButton}
					>
						Save Changes
					</button>
				</section>

				<button
					className={styles.closeEditProductDialogButton}
					onClick={() => editProductRef.current.close()}
				>
					&times;
				</button>
				<LoadingOverlay />
			</dialog>

		</section>
	);
};

export default ProductsAdminPanel;
