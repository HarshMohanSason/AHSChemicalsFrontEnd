import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { useLoadingOverlayContext } from "../../../contexts/LoadingOverlayContext";
import {
	handleFirebaseError,
	saveOrderDetailsToFirestore,
} from "../../../utils/firebase/firebase_utility";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";

export const useOrders = () => {
	const { alert } = useAlertContext();
	const loadingOverlay = useLoadingOverlayContext();
	const { user } = useAuth();
	
	const placeOrder = async (order) => {
		loadingOverlay.trigger();
		if (user) {
			try {
				await saveOrderDetailsToFirestore(user.uid, order);
			} catch (error) {
				alert.showAlert(handleFirebaseError(error), "Error");
			} finally {
				loadingOverlay.hide();
			}
		}
	};

	return { placeOrder };
};
