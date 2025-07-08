import { firestoreDb } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { getProductsByIDsFromFirestore } from "./Products";

async function saveCartItemsToFirestore(userID, cartItems) {
  try {
    const cartDocRef = doc(firestoreDb, "users", userID, "cart", "current");
    const Items = cartItems.map((item) => ({
      Id: item.Id,
      Quantity: item.Quantity,
    }));
    await setDoc(cartDocRef, { Items }, { merge: true });
  } catch (error) {
    throw error;
  }
}

async function getSavedCartItemsFromFirestore(userID) {
  try {
    const cartDocRef = doc(firestoreDb, "users", userID, "cart", "current");
    const docSnapshot = await getDoc(cartDocRef);

    if (docSnapshot.exists()) {
      const items = docSnapshot.data().Items;
      const mappedIDs = items.map((item) => item.Id);
      const cartItems = await getProductsByIDsFromFirestore(mappedIDs);

      const finalCartItems = cartItems
        .map((cartItem) => {
          const matched = items.find((item) => item.Id === cartItem.Id);
          return matched ? { ...cartItem, ...matched } : null;
        })
        .filter(Boolean);

      return finalCartItems;
    }

    return [];
  } catch (error) {
    throw error;
  }
}

async function clearCurrentCartFromFirestore(userID) {
  try {
    const cartDocRef = doc(firestoreDb, "users", userID, "cart", "current");
    await deleteDoc(cartDocRef);
  } catch (error) {
    throw error;
  }
}

export {
  saveCartItemsToFirestore,
  getSavedCartItemsFromFirestore,
  clearCurrentCartFromFirestore,
};
