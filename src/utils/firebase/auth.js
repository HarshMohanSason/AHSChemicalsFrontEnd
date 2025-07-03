import { auth } from "./FirebaseConfig";
import {
	updateProfile,
	verifyBeforeUpdateEmail,
	updatePassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";

async function loginWithEmailAndPassword(email, password) {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw error;
	}
}

async function changeDisplayName(user, newName) {
	try {
		await updateProfile(user, {
			displayName: newName,
		});
	} catch (error) {
		throw error;
	}
}

async function changeEmail(user, newEmail) {
	try {
		await verifyBeforeUpdateEmail(user, newEmail);
	} catch (error) {
		throw error;
	}
}

async function changePassword(user, newPassword) {
	try {
		await updatePassword(user, newPassword);
	} catch (error) {
		throw error;
	}
}

async function resetPassword(email) {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		throw error;
	}
}

//Returns the allowed brands and the property address
async function getUserFirestoreInfo(userID) {
  try {
    const docRef = doc(firestoreDb, "users", userID);
    const docSnapsot = await getDoc(docRef);
    const userFirestoreData = docSnapsot.data();
    return userFirestoreData;
  } catch (error) {
    throw error;
  }
}
export {
	loginWithEmailAndPassword,
	changeDisplayName,
	changeEmail,
	changePassword,
	resetPassword,
	getUserFirestoreInfo,
};