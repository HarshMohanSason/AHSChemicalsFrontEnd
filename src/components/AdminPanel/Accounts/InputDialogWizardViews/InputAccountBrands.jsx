import { useProductsContext } from "../../../../contexts/ProductsContext";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountBrands = ({ user, setUser }) => {
	const productsProvider = useProductsContext();
	const brands = productsProvider.filters.Brands ?? []
	return (
		<section className={styles.inputAccountBrandName}>
			{brands.map((brand, index) => (
					<label key={index} className={styles.brandPill}>
						<input
							type="checkbox"
							value={brand}
							className={styles.checkboxInput}
							checked={user.brands.includes(brand)} 
							onChange={(e) => {
								const isChecked = e.target.checked;
								const updatedBrands = isChecked
									? [...user.brands, brand] //if checked add it to the user brand list
									: user.brands.filter((b) => b !== brand); //else remove

								setUser({ ...user, brands: updatedBrands });
							}}
						/>
						<span>{brand}</span>
					</label>
				))}
		</section>
	);
};