import { createContext, useContext, useState, useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { signOut } from "firebase/auth";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          const isAdmin = tokenResult.claims.admin;
          const token = tokenResult.token;
          setUser({
            ...firebaseUser,
            isAdmin,
            token,
          });
        } catch (error) {
          //Logging out if any error occurres
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
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
