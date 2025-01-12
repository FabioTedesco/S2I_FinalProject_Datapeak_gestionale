import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  metodoPagamento: "cdc",
  emailCliente: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentModal: (state, action) => {
      state.showModal = action.payload;
    },
    setMetodoPagamento: (state, action) => {
      state.metodoPagamento = action.payload;
    },
    setEmailCliente: (state, action) => {
      state.emailCliente = action.payload;
    },
  },
});

export const { setPaymentModal, setMetodoPagamento, setEmailCliente } =
  paymentSlice.actions;

export default paymentSlice.reducer;
