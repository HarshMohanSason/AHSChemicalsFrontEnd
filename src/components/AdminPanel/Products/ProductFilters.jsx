import styles from "./ProductFilters.module.css";

const ProductFilters = ({ productFilters, toggleFilter }) => {
	const brands = productFilters?.Brands ?? [];
	const types = productFilters?.Types ?? [];

	return (
		<section className={styles.filtersSection}>
			<div className={styles.filterDiv}>
				<h1>Brands</h1>
				{brands.map((brand, index) => (
					<div key={index} className={styles.filterInputDiv}>
						<input
							type="checkbox"
							onChange={() => toggleFilter("Brands", brand)}
							checked={productFilters?.selectedFilters?.Brands?.includes(
								brand.toLowerCase(),
							)}
						/>
						<label
							className={
								productFilters?.selectedFilters?.Brands?.includes(
									brand.toLowerCase(),
								)
									? styles.activeLabel
									: styles.label							}
						>
							{brand}
						</label>
					</div>
				))}
			</div>
			<div className={styles.filterDiv}>
				<h1>Types</h1>
				{types.map((type, index) => (
					<div key={index} className={styles.filterInputDiv}>
						<input
							type="checkbox"
							onChange={() => toggleFilter("Types", type)}
							checked={productFilters?.selectedFilters?.Types?.includes(
								type.toLowerCase(),
							)}
						/>
						<label
							className={
								productFilters?.selectedFilters?.Types?.includes(
									type.toLowerCase(),
								)
									? styles.activeLabel
									: styles.label
							}
						>
							{type}
						</label>
					</div>
				))}
			</div>
		</section>
	);
};
export { ProductFilters };
