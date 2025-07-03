import {
	collection,
	getDocs,
	where,
	query,
	doc,
	updateDoc,
	addDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestoreDb, storage } from "./FirebaseConfig";

async function saveOrderDetailsInFirestore(order) {
	try {
		const ordersCollectionRef = collection(firestoreDb, "orders");
		const docRef = await addDoc(ordersCollectionRef, order);
		return docRef.id;
	} catch (error) {
		throw error;
	}
}

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

async function updateOrderItemsInFirestore(orderID, updates) {
	try {
		const docRef = doc(firestoreDb, "orders", orderID);
		await updateDoc(docRef, updates);
	} catch (error) {
		throw error;
	}
}

async function updateOrderStatusInFirestore(orderID, newStatus) {
	try {
		const docRef = doc(firestoreDb, "orders", orderID);
		await updateDoc(docRef, {
			status: newStatus,
		});
	} catch (error) {
		throw error;
	}
}

async function updateOrderSignatureURLInFirestore(orderID, url) {
	try {
		const docRef = doc(firestoreDb, "orders", orderID);
		await updateDoc(docRef, {
			signature_url: url,
		});
	} catch (error) {
		throw error;
	}
}

async function deleteSignatureFromStorage(orderID) {
	try {
		const fileRef = ref(storage, `orders/${orderID}/signature.png`);
		await deleteObject(fileRef);
	} catch (error) {
		if (error.code !== "storage/object-not-found") {
			throw error;
		}
	}
}

async function deletePurchaseOrderFromStorage(orderID) {
	try {
		const fileRef = ref(storage, `orders/${orderID}/purchase_order`);
		await deleteObject(fileRef);
	} catch (error) {
		throw error;
	}
}
export {
	saveOrderDetailsInFirestore,
	fetchOrdersForAdmin,
	fetchOrdersForUser,
	updateOrderItemsInFirestore,
	deletePurchaseOrderFromStorage,
	updateOrderStatusInFirestore,
	updateOrderSignatureURLInFirestore,
	deleteSignatureFromStorage,
};
