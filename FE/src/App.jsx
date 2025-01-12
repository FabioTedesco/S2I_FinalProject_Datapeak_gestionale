import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AggiungiProdotto from "./features/addProducts/AggiungiProdotto";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import StoricoOrdiniPage from "./pages/StoricoOrdiniPage";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./features/auth/PrivateRoute";

function App() {
  return (
    <div className="bg-hero-pattern flex flex-col min-h-screen w-full">
      <Routes>
        {/* rotte pubbliche*/}
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/prodotti"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/aggiungi-prodotto"
          element={
            <PrivateRoute>
              <AggiungiProdotto />
            </PrivateRoute>
          }
        />
        <Route
          path="/cassa"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/storico-ordini"
          element={
            <PrivateRoute>
              <StoricoOrdiniPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
