import React from "react";
import { useProducts } from "../../../hooks/ProductsHook";

const BrandSelectorInput = ({ userInfo, setUserInfo }) => {
	const { brands, loading } = useProducts();

	if (loading) {
		return <p>Loading brands...</p>;
	}

	return (
		<section
			style={{ display: "flex", flexDirection: "column", gap: "5px" }}
		>
			{brands.length !== 0 &&
				brands.map((brand, index) => {
					return (
						<label
							key={index}
							style={{
								display: "flex",
								alignItems: "center",
								padding: "10px 0",
								cursor: "pointer",
								fontSize: "16px",
								gap: "10px",
							}}
						>
							<input	
								type="checkbox"
								checked={userInfo.brands.includes(brand)}
								value={brand}
								onChange={(e) => {
									if (e.target.checked) {
										setUserInfo({
											...userInfo,
											brands: [...userInfo.brands, brand],
										});
									} else {
										setUserInfo({
											...userInfo,
											brands: userInfo.brands.filter(
												(b) => b !== brand,
											),
										});
									}
									console.log(userInfo)
								}}
								style={{
									width: "22px",
									height: "22px",
									accentColor: "#4CAF50", // nice green accent
									cursor: "pointer",
								}}
							/>
							<span
								style={{
									color: "#333",
									fontSize: "20px",
									fontWeight: "500",
								}}
							>
								{brand.toUpperCase()}
							</span>
						</label>
					);
				})}
		</section>
	);
};

export default BrandSelectorInput;