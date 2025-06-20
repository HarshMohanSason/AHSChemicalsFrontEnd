import { collection, getDocs, where, query, } from "firebase/firestore";
import { firestoreDb } from "./firebase.config";

async function fetchOrdersForAdmin() {
	try {
		const colRef = collection(firestoreDb, "orders");
		const docsSnapshot = await getDocs(colRef);
		if (!docsSnapshot.empty) {
			const orders = docsSnapshot.docs.map((doc, _) => doc.data());
			return orders;
		} else {
			return [];
		}
	} catch (error) {
		throw error;
	}
}

async function fetchOrdersForUser(userID) {
	try {
		const q = query(
			collection(firestoreDb, "orders"),
			where("user_id", "==", userID),
		);
		const querySnapshot = await getDocs(q);
		if (querySnapshot.length > 0) {
			const orders = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return orders;
		} else {
			return [];
		}
	} catch (error) {
		throw error;
	}
}

export { fetchOrdersForAdmin, fetchOrdersForUser };
