import { createContext, useContext } from "react";
import useCustomers from "../hooks/Customers/UseCustomers";

const CustomersContext = createContext();

export default function CustomersProvider({ children }){
	const customersProvider = useCustomers();

	return (
		<CustomersContext.Provider
			value={customersProvider}
		>
			{children}
		</CustomersContext.Provider>
	);
};

export const useCustomersContext = () => useContext(CustomersContext);
