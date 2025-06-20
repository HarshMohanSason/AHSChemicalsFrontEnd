import InputField from "../../../components/InputField/InputField";
import { useFiltersContext } from "../../../contexts/FiltersContext";

const AddBrand = () => {
	const filters = useFiltersContext();
	return (
		<InputField
			required
			style={{width: "90%"}}
			maxLength={20}
			placeholder="Enter the brand name"
			type="text"
			value={filters.newBrandInput}
			onChange={(e) =>
				filters.setNewBrandInput(e.target.value)
			}
		/>
	);
};

const AddType = () => {
	const filters = useFiltersContext();
	return (
		<InputField
			required
			style={{width: "90%"}}
			maxLength={50}
			placeholder="Enter the type name"
			type="text"
			value={filters.newTypeInput}
			onChange={(e) =>
				filters.setNewTypeInput(e.target.value)
			}
		/>
	);
};

export { AddBrand, AddType };
