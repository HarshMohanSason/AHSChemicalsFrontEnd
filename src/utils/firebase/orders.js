import {
	collection,
	getDocs,
	where,
	query,
	doc,
	updateDoc,
	addDoc,
	getDoc,
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
			const orders = docsSnapshot.docs.map((doc) => ({
				Id: doc.id,
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
async function fetchSingleOrder(orderID) {
	try {
		const docRef = doc(firestoreDb, "orders", orderID);
		const docSnapshot = await getDoc(docRef);
		return { Id: docSnapshot.id, ...docSnapshot.data() };
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
				Id: doc.id,
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
			Status: newStatus,
		});
	} catch (error) {
		throw error;
	}
}

async function updateOrderSignatureURLInFirestore(orderID, url) {
	try {
		const docRef = doc(firestoreDb, "orders", orderID);
		await updateDoc(docRef, {
			SignatureURL: url,
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
		//If a file exists, ignore it.
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
	fetchSingleOrder,
	fetchOrdersForUser,
	updateOrderItemsInFirestore,
	deletePurchaseOrderFromStorage,
	updateOrderStatusInFirestore,
	updateOrderSignatureURLInFirestore,
	deleteSignatureFromStorage,
};
