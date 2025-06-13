import useProducts from "../../../../hooks/Products/UseProducts";
import { extractFiltersFromProducts } from "../../../../utils/Products/ProductsUtil";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountBrandName = ({ user, setUser}) => {
	const { fetchedProducts, fetchProductsLoading } = useProducts();
	const filters = extractFiltersFromProducts(fetchedProducts);

	return (
		<section className={styles.inputAccountBrandName}>
			{fetchProductsLoading && (
				<p className={styles.loadingBrandsText}>Loading Brands</p>
			)}
			{!fetchProductsLoading &&
				filters.Brand &&
				filters.Brand.map((brand, index) => (
					<label key={index} className={styles.brandPill}>
						<input
							type="checkbox"
							value={brand}
							className={styles.checkboxInput}
							checked={user.brands.some(
								(value) => value === brand,
							)}
							onChange={(e) => {
								const isChecked = e.target.checked;
								const updatedBrands = isChecked
									? [...user.brands, brand] // add brand
									: user.brands.filter((b) => b !== brand); // remove brand

								setUser({ ...user, brands: updatedBrands });
							}}
						/>
						<span>{brand}</span>
					</label>
				))}
		</section>
	);
};

