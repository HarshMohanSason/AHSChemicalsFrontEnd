import { firestoreDb } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

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
async function getCartItemsByIDFromFirestore(cartIDs) {
  const chunks = [];
  const CHUNK_SIZE = 10; //Firestore only allows to fetch in max batches of 10

  for (let i = 0; i < cartIDs.length; i += CHUNK_SIZE) {
    chunks.push(cartIDs.slice(i, i + CHUNK_SIZE));
  }
  const allDocs = [];

  for (const chunk of chunks) {
    const q = query(
      collection(firestoreDb, "products"),
      where("__name__", "in", chunk), //Fetch all the documents with the docIDs in the chunk
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      allDocs.push(doc.data());
    });
  }
  return allDocs;
}

async function getSavedCartItemsFromFirestore(userID) {
  try {
    const cartDocRef = doc(firestoreDb, "users", userID, "cart", "current");
    const docSnapshot = await getDoc(cartDocRef);

    if (docSnapshot.exists()) {
      const items = docSnapshot.data().Items;
      const mappedIDs = items.map((item) => item.Id);
      const cartItems = await getCartItemsByIDFromFirestore(mappedIDs);

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
async function clearCartFromFirestore(userID) {
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
  clearCartFromFirestore,
};
