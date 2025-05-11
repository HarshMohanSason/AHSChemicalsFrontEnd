
export function handleFirebaseError(error) {
  const errorCode = error.code;
  let message = "An unexpected error occurred. Please try again.";

  switch (errorCode) {
    case "auth/user-not-found":
      message = "No account found with this email.";
      break;
    case "auth/wrong-password":
      message = "Incorrect password. Please try again.";
      break;
    case "auth/email-already-in-use":
      message = "This email is already registered.";
      break;
    case "auth/weak-password":
      message = "Your password should be at least 6 characters.";
      break;
    case "auth/invalid-email":
      message = "The email address is invalid.";
      break;
    case "auth/too-many-requests":
      message = "Too many attempts. Please wait and try again.";
      break;
    case "auth/network-request-failed":
      message = "Network error. Please check your internet connection.";
      break;
    case "auth/user-disabled":
      message = "This account has been disabled.";
      break;
    case "auth/operation-not-allowed":
      message = "Operation not allowed. Please contact support.";
      break;
    case "auth/account-exists-with-different-credential":
      message =
        "An account already exists with the same email but different sign-in method.";
      break;
    case "auth/invalid-credential":
      message = "Invalid credentials provided. Please try again.";
      break;
    case "auth/invalid-verification-code":
      message = "Invalid verification code. Please check and try again.";
      break;
    case "auth/invalid-verification-id":
      message = "Invalid verification ID. Please request a new code.";
      break;
    case "auth/missing-verification-code":
      message = "Missing verification code. Please enter the code.";
      break;
    case "auth/missing-verification-id":
      message = "Missing verification ID. Please try again.";
      break;
    case "auth/expired-action-code":
      message = "This action link has expired. Please request a new one.";
      break;
    case "auth/invalid-action-code":
      message = "The action code is invalid. Please check and try again.";
      break;
    case "auth/invalid-password":
      message = "Invalid password. Please try again.";
      break;
    case "auth/requires-recent-login":
      message = "Please log in again to complete this operation.";
      break;
    case "auth/provider-already-linked":
      message = "This provider is already linked to the account.";
      break;
    case "auth/credential-already-in-use":
      message = "This credential is already associated with another account.";
      break;
    case "auth/popup-closed-by-user":
      message = "The popup was closed before completing the sign in.";
      break;
    case "auth/cancelled-popup-request":
      message = "Cancelled popup request. Please try again.";
      break;
    case "auth/popup-blocked":
      message = "Popup blocked by the browser. Please allow popups.";
      break;
    default:
      break;
  }
  return message;
}