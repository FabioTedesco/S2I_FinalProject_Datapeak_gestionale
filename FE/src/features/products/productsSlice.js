import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services/productsService";

const initialState = {
  search: "",
  prodotti: [],
  // prodottiFiltrati: [],
  categoriaSelected: "NO FILTRI",
  pagina: 0,
  paginationVisibile: true,
  prodottoDaModificare: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "prodotto/fetchProducts",
  async (offset, { rejectWithValue, getState }) => {
    try {
      const response = await getProducts(offset);

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      // Verifica se l'errore è stato generato dalla risposta del server
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      // Gestisce errori non specifici del server
      return rejectWithValue("Errore durante l'aggiunta del prodotto");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setProdottiFiltrati: (state, action) => {
      state.prodotti = action.payload;
    },
    setCategoriaSelected: (state, action) => {
      state.categoriaSelected = action.payload;
    },
    setPagina: (state, action) => {
      state.pagina = action.payload;
    },
    setPaginationVisibile: (state, action) => {
      state.paginationVisibile = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProdottoDaModificare: (state, action) => {
      state.prodottoDaModificare = action.payload;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.prodotti = state.prodotti.filter(
        (product) => product.id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.prodotti = action.payload;

        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setSearch,
  setProdottiFiltrati,
  setCategoriaSelected,
  setPagina,
  updateProduct,
  setPaginationVisibile,
  setStatus,
  setProdottoDaModificare,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
