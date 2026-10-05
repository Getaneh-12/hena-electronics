import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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

  useEffect(() => {
    const schemaId =
      "hena-local-business-schema";

    const existingSchema =
      document.getElementById(
        schemaId
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const localBusinessSchema = {
      "@context": "https://schema.org",

      "@type": "ElectronicsStore",

      "@id":
        "https://hena-electronics.onrender.com/#business",

      name: "Hena Electronics",

      url:
        "https://hena-electronics.onrender.com/",

      logo:
        "https://hena-electronics.onrender.com/hena-logo.png",

      image:
        "https://hena-electronics.onrender.com/hena-logo.png",

      description:
        "Hena Electronics is an electronics store in Addis Ababa offering smartphones, laptops, computers, accessories, and quality technology products.",

      telephone:
        "+251990239030",

      priceRange: "ETB",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },

      areaServed: {
        "@type": "City",
        name: "Addis Ababa",
      },

      sameAs: [
        "https://t.me/PCandphone4u",
      ],
    };

    const schemaScript =
      document.createElement(
        "script"
      );

    schemaScript.id = schemaId;

    schemaScript.type =
      "application/ld+json";

    schemaScript.textContent =
      JSON.stringify(
        localBusinessSchema
      );

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const schema =
        document.getElementById(
          schemaId
        );

      if (schema) {
        schema.remove();
      }
    };
  }, []);

  return (
    <AdminAuthProvider>
      <ProductProvider>
        <BrowserRouter>

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetails />
              }
            />

            <Route
              path="/admin/login"
              element={
                <AdminLogin />
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />

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