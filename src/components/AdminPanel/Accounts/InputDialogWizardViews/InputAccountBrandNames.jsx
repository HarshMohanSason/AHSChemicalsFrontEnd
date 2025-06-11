import useFetchProducts from "../../../../hooks/Products/UseFetchProducts";
import { extractFiltersFromProducts } from "../../../../utils/Products/ProductsUtil";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountBrandName = ({ user, setUser}) => {
	const { products, loading } = useFetchProducts();
	const filters = extractFiltersFromProducts(products);

	return (
		<section className={styles.inputAccountBrandName}>
			{loading && (
				<p className={styles.loadingBrandsText}>Loading Brands</p>
			)}
			{!loading &&
				filters.Brand &&
				filters.Brand.map((brand, index) => (
					<label key={index} className={styles.brandPill}>
						<input
							type="checkbox"
							value={brand}
							className={styles.checkboxInput}
							checked={user.brands.some(
								(value) => value == brand,
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

