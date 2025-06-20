import { useFiltersContext } from "../../../../contexts/FiltersContext";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountBrands = ({ user, setUser }) => {
	const filters = useFiltersContext();

	return (
		<section className={styles.inputAccountBrandName}>
			{filters?.brands.length > 0 &&
				filters.brands.map((brand) => (
					<label key={brand.id} className={styles.brandPill}>
						<input
							type="checkbox"
							value={brand.name}
							className={styles.checkboxInput}
							checked={user.brands.includes(brand.name)} 
							onChange={(e) => {
								const isChecked = e.target.checked;
								const updatedBrands = isChecked
									? [...user.brands, brand.name] //if checked add it to the user brand list
									: user.brands.filter((b) => b !== brand.name); //else remove

								setUser({ ...user, brands: updatedBrands });
							}}
						/>
						<span>{brand.name}</span>
					</label>
				))}
		</section>
	);
};