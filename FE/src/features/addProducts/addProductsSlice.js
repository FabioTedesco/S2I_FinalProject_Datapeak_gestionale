import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct } from "../../services/productsService";
import Swal from "sweetalert2";

const initialState = {
  formData: {
    nome: "",
    prezzoOriginale: "",
    scontoProdotto: "",
    barcode: "",
    giacenza: "",
    colore: "",
    categoria: "",
    taglia: "",
  },
  loading: false,
  error: null,
  success: false,
};

export const aggiungiProdottoThunk = createAsyncThunk(
  "prodotto/aggiungiProdotto",
  async (prodotto, { rejectWithValue }) => {
    try {
      const prodottoConSconto = {
        ...prodotto,
        scontoProdotto: prodotto.scontoProdotto / 100,
      };
      const response = await createProduct(prodottoConSconto);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire("Errore", error.response.data.message, "error");
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore durante l'aggiunta del prodotto");
    }
  }
);

const addProductSlice = createSlice({
  name: "prodotto",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;

      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = {
        nome: "",
        prezzoOriginale: "",
        scontoProdotto: "",
        barcode: "",
        giacenza: "",
        colore: "",
        categoria: "",
        taglia: "",
      };
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(aggiungiProdottoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(aggiungiProdottoThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        Swal.fire("Prodotto aggiunto con successo");
        addProductSlice.caseReducers.resetForm(state);
      })
      .addCase(aggiungiProdottoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFormData, resetForm } = addProductSlice.actions;

export default addProductSlice.reducer;
