// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import paymentReducer from "../features/payment/paymentSlice";
import addProductsReducer from "../features/addProducts/addProductsSlice";
import storicoOrdiniReducer from "../features/storicoOrdini/storicoOrdiniSlice";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    addProducts: addProductsReducer,
    storicoOrdini: storicoOrdiniReducer,
    payment: paymentReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
