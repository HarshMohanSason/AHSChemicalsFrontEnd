import { useAuth } from "./firebase/AuthContext";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { Navigate} from "react-router-dom";
import { Children } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); // Get the user from the context

  if (isLoading) {
    return <LoadingOverlay showOverlay={isLoading} />;
  }
  if (!user)
  {
    return <Navigate to="/account" />
  }
  if (user.isAdmin) {
     return children;
  }
  else {
    return <Navigate to="/account" />
  }
};
export default ProtectedRoute;
