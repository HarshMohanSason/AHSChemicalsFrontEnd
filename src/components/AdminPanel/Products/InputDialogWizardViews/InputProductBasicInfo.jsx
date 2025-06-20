import { useFiltersContext } from "../../../../contexts/FiltersContext";
import { toTitleCase } from "../../../../utils/StringUtils";
import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

/**
 * InputProductName Component
 *
 * This component renders a text input field for entering the product name.
 * It uses a reusable InputField component and displays validation errors
 * if provided through props.
 *
 * Props:
 * @params product (Object): The current product state object containing at least the `name` key.
 * @params setProduct (Function): A state setter function used to update the product object.
 *
 * Usage:
 * <InputProductName
 *   product={product}
 *   setProduct={setProduct}
 *   error={error}
 * />
 */

export const InputProductBasicInfo = ({ product, setProduct }) => {
	const filters = useFiltersContext();

	return (
		<section className={styles.productMetaDataSection}>
			<InputField
				placeholder={"Product Name"}
				type="text"
				value={product.name}
				onChange={(e) =>
					setProduct({ ...product, name: e.target.value.toUpperCase() })
				}
			/>
			<label>Select Brand</label>
			<select
				value={product.brand}
				className={styles.filterSelector}
				onChange={(e) => {
					setProduct({ ...product, brand: e.target.value });
				}}
			>
				{filters?.brands.map((brand) => (
					<option key={brand.id} value={brand.name}>
						{toTitleCase(brand.name)}
					</option>
				))}
			</select>
			<label>Select Type</label>
			<select
				value={product.type}
				className={styles.filterSelector}
				onChange={(e) => {
					setProduct({ ...product, type: e.target.value });
				}}
			>
				{filters?.types.map((type) => (
					<option key={type.id} value={type.name}>
						{toTitleCase(type.name)}
					</option>
				))}
			</select>

			<label>Hazard Type</label>
			<select
				value={product.hazard_type}
				className={styles.filterSelector}
				onChange={(e) => {
					setProduct({ ...product, hazard_type: e.target.value });
				}}
			>
				<option value="HAZARDOUS">Hazardous</option>
				<option value="NON-HAZARDOUS">Non-hazardous</option>
			</select>
		</section>
	);
};
