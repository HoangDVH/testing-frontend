import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import BagPage from "./pages/BagPage/BagPage";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="books" element={<ShopPage />} />
              <Route path="books/:slug" element={<ProductDetailPage />} />
              <Route path="bag" element={<BagPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}
