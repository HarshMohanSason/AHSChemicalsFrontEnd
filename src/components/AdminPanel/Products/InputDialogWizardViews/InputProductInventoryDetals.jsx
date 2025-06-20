import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductInventoryDetails = ({ product, setProduct }) => {
	const updateVariant = (index, field, value) => {
		const updatedVariants = [...product.variants];
		updatedVariants[index] = {
			...updatedVariants[index],
			[field]: value,
		};
		setProduct({ ...product, variants: updatedVariants });
	};

	const addVariant = () => {
		const newVariant = {
			inventory: "",
			size: "",
			price: "",
			sku: "",
			status: "OUT OF STOCK",
		};
		setProduct({ ...product, variants: [...product.variants, newVariant] });
	};

	const removeVariant = (index) => {
		const updatedVariants = product.variants.filter((_, i) => i !== index);
		setProduct({ ...product, variants: updatedVariants });
	};

	return (
		<section className={styles.inputProductInventoryDetails}>
			{product.variants.map((variant, index) => (
				<div className={styles.variantItem} key={index}>
					<div className={styles.sizePriceInventoryDiv}>
						<InputField
							label="Size"
							style={{ width: "80%" }}
							placeholder="Size"
							type="number"
							value={variant.size}
							onChange={(e) =>
								updateVariant(
									index,
									"size",
									Number(e.target.value),
								)
							}
						/>
						<InputField
							label="Price"
							style={{ width: "80%" }}
							placeholder="Price"
							type="number"
							value={variant.price}
							onChange={(e) =>
								updateVariant(
									index,
									"price",
									Number(e.target.value),
								)
							}
						/>
						<InputField
							label="Inventory"
							style={{ width: "80%" }}
							placeholder="Inventory"
							type="number"
							value={variant.inventory}
							onChange={(e) =>
								updateVariant(
									index,
									"inventory",
									Number(e.target.value),
								)
							}
						/>
					</div>
					<InputField
						label="SKU"
						style={{ width: "80%" }}
						placeholder="SKU"
						type="text"
						value={variant.sku}
						onChange={(e) =>
							updateVariant(index, "sku", e.target.value)
						}
					/>
					<label className={styles.variantStatusSelectorLabel}>
						Status
					</label>
					<select
						value={variant.status}
						onChange={(e) =>
							updateVariant(index, "status", e.target.value)
						}
						className={styles.variantSelector}
					>
						<option value="OUT OF STOCK">Out of Stock</option>
						<option value="IN STOCK">In Stock</option>
					</select>
					{index > 0 && (
						<button
							type="button"
							className={styles.removeVariantButton}
							onClick={() => removeVariant(index)}
						>
							&times;
						</button>
					)}
				</div>
			))}
			<div className={styles.sizeUnitAddVariantDiv}>
				<select
					className={styles.filterSelector}
					value={product.sizeUnit}
					onChange={(e) =>
						setProduct({ ...product, sizeUnit: e.target.value })
					}
				>
					<option value="GALLONS">Gallons</option>
					<option value="LITERS">Litres</option>
					<option value="KILOGRAMS">Kilograms</option>
					<option value="POUNDS">Pounds</option>
				</select>
				<button
					type="button"
					className={styles.addVariantButton}
					onClick={addVariant}
				>
					+
				</button>
			</div>
		</section>
	);
};
