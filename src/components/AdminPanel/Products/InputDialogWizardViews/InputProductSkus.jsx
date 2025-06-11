import InputField from "../../../InputField/InputField"

export const InputProductSkus = ({product, setProduct, error}) => {

	return(
		<section>
			{product.variants &&
				product.variants.map((variant, index) => (
						<InputField
							key={index}
							label={`SKU for size ${variant.size} ${variant.unit}`}
							type="text"
							value={variant.size}
							error={error}
						/>
				))}
		</section>
		)
}