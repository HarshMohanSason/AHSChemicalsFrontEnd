import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { listAll, deleteObject } from "firebase/storage";
async function uploadProductToFirestore(product) {
  try {
    const productID = product.id || crypto.randomUUID(); // or generate however you like
    const docRef = doc(firestoreDb, "products", productID);
    await setDoc(docRef, product);
  } catch (error) {
    throw error;
  }
}

async function updateProductInFirestore(product) {
  try {
    const docRef = doc(firestoreDb, "products", product.id);
    await updateDoc(docRef, product);
  } catch (error) {
    throw error;
  }
}

async function deleteProductFromFirestore(productID) {
  try {
    const docRef = doc(firestoreDb, "products", productID);
    await deleteDoc(docRef);
  } catch (error) {
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

export async function deleteProductImagesFromStorage(productID) {
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
  uploadProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  fetchProductsFromFirestore,
  deleteProductImagesFromStorage,
};
