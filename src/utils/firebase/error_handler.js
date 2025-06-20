const firebaseErrorMessages = {
  // AUTH ERRORS
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Your password should be at least 6 characters.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/operation-not-allowed":
    "Operation not allowed. Please contact support.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in method.",
  "auth/invalid-credential": "Invalid credentials provided. Please try again.",
  "auth/invalid-verification-code":
    "Invalid verification code. Please check and try again.",
  "auth/invalid-verification-id":
    "Invalid verification ID. Please request a new code.",
  "auth/missing-verification-code":
    "Missing verification code. Please enter the code.",
  "auth/missing-verification-id": "Missing verification ID. Please try again.",
  "auth/expired-action-code":
    "This action link has expired. Please request a new one.",
  "auth/invalid-action-code":
    "The action code is invalid. Please check and try again.",
  "auth/requires-recent-login":
    "Please log in again to complete this operation.",
  "auth/provider-already-linked":
    "This provider is already linked to the account.",
  "auth/credential-already-in-use":
    "This credential is already associated with another account.",
  "auth/popup-closed-by-user":
    "The popup was closed before completing the sign in.",
  "auth/cancelled-popup-request": "Cancelled popup request. Please try again.",
  "auth/popup-blocked": "Popup blocked by the browser. Please allow popups.",
  "auth/multi-factor-auth-required":
    "Multi-factor authentication required to sign in.",
  "auth/invalid-api-key": "Invalid API key. Please contact support.",
  "auth/user-mismatch":
    "Credential does not correspond to the previously signed-in user.",
  "auth/user-token-expired": "Your session has expired. Please sign in again.",
  "auth/admin-restricted-operation":
    "This operation is restricted. Please contact support.",
  "auth/email-change-needs-verification":
    "Please verify your email before changing it.",
  "auth/tenant-id-mismatch": "Tenant mismatch. Please contact support.",

  // FIRESTORE ERRORS
  "permission-denied": "You do not have permission to perform this operation.",
  "not-found": "Requested document not found.",
  unavailable: "Service unavailable. Please try again later.",
  "resource-exhausted": "Quota exceeded. Please contact support.",
  "failed-precondition": "Operation failed due to precondition not met.",
  aborted: "The operation was aborted. Please try again.",
  cancelled: "The operation was cancelled.",
  "deadline-exceeded": "Request timed out. Please try again.",
  "already-exists": "Resource already exists.",

  // STORAGE ERRORS
  "storage/unknown": "An unknown storage error occurred.",
  "storage/object-not-found": "The requested file does not exist.",
  "storage/bucket-not-found": "The specified storage bucket does not exist.",
  "storage/project-not-found": "No project is configured for Cloud Storage.",
  "storage/quota-exceeded": "Quota exceeded for Cloud Storage.",
  "storage/unauthenticated":
    "You must be signed in to upload or download files.",
  "storage/unauthorized": "You don’t have permission to access this file.",
  "storage/retry-limit-exceeded": "Retry limit exceeded. Please try again.",
  "storage/invalid-checksum": "File corrupted during upload. Please try again.",
  "storage/canceled": "Upload canceled by the user.",
  "storage/invalid-event-name": "Invalid event name used in listener.",
  "storage/invalid-url": "The provided URL is not in a recognized format.",
  "storage/invalid-argument": "Invalid argument provided to Storage method.",
  "storage/no-default-bucket":
    "No default storage bucket configured in Firebase project.",
  "storage/cannot-slice-blob": "Cannot slice the given blob or file.",
  "storage/server-file-wrong-size":
    "Server file size does not match client file size.",

  // REALTIME DATABASE ERRORS
  "database/permission-denied":
    "You do not have permission to access this data.",
  "database/network-error":
    "Network error while trying to communicate with the database.",
  "database/operation-failed": "The database operation failed.",
  "database/disconnected": "Connection to the database was lost.",
  "database/timeout": "The database operation timed out. Please try again.",
};

function handleFirebaseError(error) {
  const errorCode = error.code || error.message || error;
  return (
    firebaseErrorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
}

export {handleFirebaseError}
