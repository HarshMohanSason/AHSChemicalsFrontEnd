import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ProtectedRoute from "./utils/ProtectedRoute";
import Cart from "./pages/Cart/Cart";
import ProductsPage from "./pages/Products/ProductsPage";
import SingleProduct from "./pages/Products/SingleProduct";
import AlertBox from "./components/AlertBox/AlertBox";
import ConfirmationAlertBox from "./components/AlertBox/ConfirmationAlertBox";
import { useAlertContext } from "./contexts/AlertBoxContext";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
function App() {
  const { alert, confirmationAlert } = useAlertContext();
  return (
    <Router>
      <Header /> {/* always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/account" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <LoadingOverlay />
      <AlertBox key={alert.id} />
      <ConfirmationAlertBox key={confirmationAlert.id} />
      <Footer /> {/* always visible */}
    </Router>
  );
}

export default App;
