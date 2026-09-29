import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminPromotions from "./pages/AdminPromotions";

import ProtectedRoute from "./components/ProtectedRoute";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ProductProvider } from "./context/ProductContext";

import "./App.css";


function App() {

  return (

    <AdminAuthProvider>

      <ProductProvider>

        <BrowserRouter>

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />


            {/* PRODUCT DETAILS */}
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />


            {/* ADMIN LOGIN */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />


            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />


            {/* ADMIN PRODUCTS */}
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />


            {/* ADD PRODUCT */}
            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />


            {/* EDIT PRODUCT */}
            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />


            {/* PROMOTIONS */}
            <Route
              path="/admin/promotions"
              element={
                <ProtectedRoute>
                  <AdminPromotions />
                </ProtectedRoute>
              }
            />

          </Routes>

        </BrowserRouter>

      </ProductProvider>

    </AdminAuthProvider>

  );
}


export default App;