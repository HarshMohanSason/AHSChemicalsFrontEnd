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
import QuickBooksDisconnect from "./pages/Disconnect/QuickBooksDisconnect";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import QuickBooksAuthSuccessPage from "./pages/QuickBooks/QuickBooksAuthSuccessPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const { alert, confirmationAlert } = useAlertContext();

  const MainLayout = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

  const MinimalLayout = ({ children }) => <>{children}</>;

  return (
    <Router>

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route
          path="/account"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <MainLayout>
              <SingleProduct />
            </MainLayout>
          }
        />
        <Route
          path="/quickbooks-disconnect"
          element={
            <MainLayout>
              <QuickBooksDisconnect />
            </MainLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <MainLayout>
              <TermsOfService />
            </MainLayout>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminPanel />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/quickbooks-auth-success"
          element={
            <MinimalLayout>
              <QuickBooksAuthSuccessPage />
            </MinimalLayout>
          }
        />
      </Routes>

      <LoadingOverlay />
      <AlertBox key={alert.id} />
      <ConfirmationAlertBox key={confirmationAlert.id} />
    </Router>
  );
}

export default App;
