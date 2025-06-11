import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ProtectedRoute from "./utils/ProtectedRoute";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Router>
      <Header /> {/* always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/account" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products/>} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer /> {/* always visible */}
    </Router>
  );
}

export default App;
