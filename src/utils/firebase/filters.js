import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestoreDb } from "./firebase.config";

async function fetchBrandsFromFirestore() {
  try {
    const docsRef = collection(firestoreDb, "brands");
    const docsSnapshot = await getDocs(docsRef);
    const brands = docsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return brands;
  } catch (error) {
    throw error;
  }
}

async function fetchTypesFromFirestore() {
  try {
    const docsRef = collection(firestoreDb, "types");
    const docsSnapshot = await getDocs(docsRef);
    const types = docsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return types;
  } catch (error) {
    throw error;
  }
}

async function addBrandToFirestore(brand) {
  try {
    await addDoc(collection(firestoreDb, "brands"), { name: brand });
  } catch (error) {
    throw error;
  }
}

async function deleteBrandFromFirestore(docId) {
  try {
    await deleteDoc(doc(firestoreDb, "brands", docId));
  } catch (error) {
    throw error;
  }
}

async function addTypeToFirestore(type) {
  try {
    await addDoc(collection(firestoreDb, "types"), { name: type });
  } catch (error) {
    throw error;
  }
}

async function deleteTypeFromFirestore(docId) {
  try {
    await deleteDoc(doc(firestoreDb, "types", docId));
  } catch (error) {
    throw error;
  }
}

export {
  fetchBrandsFromFirestore,
  addBrandToFirestore,
  deleteBrandFromFirestore,
  fetchTypesFromFirestore,
  addTypeToFirestore,
  deleteTypeFromFirestore,
};