/**
 * AuthContext.js
 *
 * Provides global authentication context using Firebase Authentication.
 * Manages user authentication state, including user object, admin role, and authentication token.
 *
 * Example Usage:
 *
 * import { useAuth } from "../contexts/AuthContext";
 * const { user, isLoading } = useAuth();
 */

import { createContext, useContext, useState, useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../utils/Firebase/FirebaseConfig";
import { handleFirebaseError } from "../utils/Firebase/ErrorHandler";
import { useAlertContext } from "./AlertBoxContext";

// Create the Auth context
const AuthContext = createContext();

/**
 * AuthProvider
 *
 * Wrap this provider around your application to enable access to user authentication state globally.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the authentication context.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores the authenticated user object (or null)
  const [isLoading, setIsLoading] = useState(true); // Indicates if authentication status is still being determined
  const { alert } = useAlertContext();
  
  useEffect(() => {
    /**
     * Listen for changes in the Firebase authentication token.
     * Updates the user state with custom claims (e.g., isAdmin) and the authentication token.
     * Logs the user out on token errors.
     */
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          const isAdmin = tokenResult.claims.admin;
          const token = tokenResult.token;
          setUser({
            ...firebaseUser,
            isAdmin, // boolean - indicates if the user has admin privileges
            token, // Firebase ID token for authenticated requests
          });
        } catch (error) {
          alert.showAlert(handleFirebaseError(error), "Error");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
