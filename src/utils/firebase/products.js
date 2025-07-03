import {
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { listAll, deleteObject, ref } from "firebase/storage";
import { firestoreDb, storage } from "./FirebaseConfig";

async function updateProductInFirestore(product) {
  try {
    const docRef = doc(firestoreDb, "products", product.Id);
    await updateDoc(docRef, product);
  } catch (error) {
    throw error;
  }
}

async function deleteProductVariantFromFirestore(userID, itemToBeDeleted) {
  try {
    const docRef = doc(firestoreDb, "users", userID, "cart", "current");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Product not found.");
    }

    const cartItems = docSnap.data();
    const updatedCart = cartItems.items.filter(
      (item) => item.sku !== itemToBeDeleted.sku
    );

    await updateDoc(docRef, { items: updatedCart });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

async function fetchProductsFromFirestore() {
  try {
    const collectionRef = collection(firestoreDb, "products");
    const querySnapshot = await getDocs(collectionRef);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return documents;
  } catch (error) {
    throw error;
  }
}

async function fetchSingleProductFromFirestore(productID) {
  try {
    const docRef = doc(firestoreDb, "products", productID);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  } catch (error) {
    throw error;
  }
}
async function deleteProductImagesFromStorage(productID) {
  try {
    const storageRef = ref(storage, `products/${productID}`);
    const result = await listAll(storageRef);
    const deletionPromises = result.items.map((itemRef) =>
      deleteObject(itemRef),
    );
    await Promise.all(deletionPromises);
  } catch (error) {
    throw error;
  }
}

export {
  updateProductInFirestore,
  fetchProductsFromFirestore,
  deleteProductImagesFromStorage,
  fetchSingleProductFromFirestore,
  deleteProductVariantFromFirestore,
};
