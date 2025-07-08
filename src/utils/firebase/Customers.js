import {
	collection,
	getDoc,
	getDocs,
	doc,
	query,
	where,
	documentId,
	updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "./FirebaseConfig";

async function fetchAllCustomersFromFirestore(user) {
	try {
		// If user is an admin, fetch all customers
		if (user.isAdmin) {
			const colRef = collection(firestoreDb, "customers");
			const docsSnapshots = await getDocs(colRef);

			if (!docsSnapshots.empty) {
				return docsSnapshots.docs.map((doc) => ({
					Id: doc.id,
					...doc.data(),
				}));
			}
			return [];
		}

		// For non-admins: fetch properties associated with this user
		const docRef = doc(firestoreDb, "users", user.uid);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			const properties = docSnapshot.data().properties || [];

			if (properties.length === 0) return [];

			const customers =
				await fetchMultipleCustomersFromFirestore(properties);
			return customers;
		}

		return [];
	} catch (error) {
		throw error;
	}
}
async function fetchSingleCustomerFromFirestore(docID) {
	try {
		const docRef = doc(firestoreDb, "customers", docID);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists) {
			return docSnapshot.data();
		}
	} catch (error) {
		throw error;
	}
}

async function fetchMultipleCustomersFromFirestore(docIDList) {
	try {
		const CHUNK_SIZE = 10;
		const results = [];

		for (let i = 0; i < docIDList.length; i += CHUNK_SIZE) {
			const chunk = docIDList.slice(i, i + CHUNK_SIZE);
			const q = query(
				collection(firestoreDb, "customers"),
				where(documentId(), "in", chunk),
			);

			const snapshot = await getDocs(q);
			snapshot.forEach((doc) => {
				results.push(doc.data());
			});
		}
		return results;
	} catch (error) {
		throw error;
	}
}

async function fetchProductPricesForCustomersFromFirestore(customers) {
	try {
		const result = {
			data: {},
			lastDocument: customers[customers.length - 1],
		};

		for (const customer of customers) {
			const productPricesQuery = query(
				collection(firestoreDb, "product_prices"),
				where("customer_id", "==", customer.Id),
			);

			const productPricesSnap = await getDocs(productPricesQuery);

			const mappedProductPrices = productPricesSnap.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			result.data[customer.DisplayName] = mappedProductPrices;
		}
		return result;
	} catch (error) {
		throw error;
	}
}

async function updateCustomerProductPrice(id, newPrice) {
	try {
		const docRef = doc(firestoreDb, "product_prices", id);
		await updateDoc(docRef, {
			price: newPrice,
		});
	} catch (error) {
		throw error;
	}
}

export {
	fetchAllCustomersFromFirestore,
	fetchSingleCustomerFromFirestore,
	fetchMultipleCustomersFromFirestore,
	fetchProductPricesForCustomersFromFirestore,
	updateCustomerProductPrice,
};
