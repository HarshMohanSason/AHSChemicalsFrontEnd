import { createContext, useContext } from "react";
import { useFilters } from "../hooks/AdminPanel/AdminControls/Filters";

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
	const filters = useFilters();

	return (
		<FiltersContext.Provider value={filters}>
			{children}
		</FiltersContext.Provider>
	);
};

export const useFiltersContext = () => {
	return useContext(FiltersContext)
}

export default FiltersProvider;
