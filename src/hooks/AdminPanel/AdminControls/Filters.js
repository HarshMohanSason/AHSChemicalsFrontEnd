import { useEffect, useState } from "react";
import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { useLoadingOverlayContext } from "../../../contexts/LoadingOverlayContext";
import {
	addBrandToFirestore,
	addTypeToFirestore,
	deleteBrandFromFirestore,
	deleteTypeFromFirestore,
	fetchBrandsFromFirestore,
	fetchTypesFromFirestore,
} from "../../../utils/firebase/filters";
import { handleFirebaseError } from "../../../utils/firebase/firebase_utility";

const useFilters = () => {
	const [brands, setBrands] = useState([]);
	const [isBrandsLoading, setIsBrandsLoading] = useState(false);
	const [newBrandInput, setNewBrandInput] = useState("");

	const [types, setTypes] = useState([]);
	const [isTypesLoading, setIsTypesLoading] = useState(false);
	const [newTypeInput, setNewTypeInput] = useState("");

	const { alert } = useAlertContext();
	const loadingOverlay = useLoadingOverlayContext();

	const loadBrands = async () => {
		setIsBrandsLoading(true);
		try {
			const getBrands = await fetchBrandsFromFirestore();
			setBrands(getBrands);
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setIsBrandsLoading(false);
		}
	};

	const loadTypes = async () => {
		setIsTypesLoading(true);
		try {
			const getTypes = await fetchTypesFromFirestore();
			setTypes(getTypes);
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setIsTypesLoading(false);
		}
	};

	const addBrand = async (brand) => {
		loadingOverlay.trigger();
		try {
			if (brand.trim() === "") {
				throw new Error("Brand name cannot be empty");
			}
			const uppercasedBrand = brand.toUpperCase();
			await addBrandToFirestore(uppercasedBrand);
			await loadBrands();
			alert.showAlert("Successfully added the brand", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setNewBrandInput("");
			loadingOverlay.hide();
		}
	};

	const deleteBrand = async (docId) => {
		loadingOverlay.trigger();
		try {
			await deleteBrandFromFirestore(docId);
			await loadBrands();
			alert.showAlert("Successfully deleted the brand", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const addType = async (type) => {
		loadingOverlay.trigger();
		try {
			if (type.trim() === "") {
				throw new Error("Brand name cannot be empty");
			}
			const uppercasedType = type.toUpperCase();
			await addTypeToFirestore(uppercasedType);
			await loadTypes();
			alert.showAlert("Successfully added the type", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setNewTypeInput("");
			loadingOverlay.hide();
		}
	};

	const deleteType = async (docId) => {
		loadingOverlay.trigger();
		try {
			await deleteTypeFromFirestore(docId);
			await loadTypes();
			alert.showAlert("Successfully deleted the type", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};
	useEffect(() => {
		loadTypes();
		loadBrands();
	}, []);

	return {
		brands,
		types,
		isBrandsLoading,
		isTypesLoading,
		deleteBrand,
		deleteType,
		addBrand,
		newBrandInput,
		setNewBrandInput,
		addType,
		newTypeInput,
		setNewTypeInput,
	};
};
export { useFilters };
