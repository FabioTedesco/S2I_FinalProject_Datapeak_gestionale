import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrdini,
  deleteOrdine,
  getOrderDetails,
} from "../../services/ordersService";
import Swal from "sweetalert2";

const initialState = {
  ordini: [],
  ordiniFiltrati: [],
  dettagliOrdine: [],
  ordine: null,
  visualizzaOrdine: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchOrdini = createAsyncThunk(
  "ordine/fetchOrdini",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdini();
      return response.data.data;
    } catch (error) {
      // Verifica se l'errore è stato generato dalla risposta del server
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      // Gestisce errori non specifici del server
      return rejectWithValue("Errore");
    }
  }
);

export const fetchDettagliOrdine = createAsyncThunk(
  "ordine/fetchDettagliOrdine",
  async (carrello_id, { rejectWithValue }) => {
    try {
      const response = await getOrderDetails(carrello_id);

      return response.data.articoli;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "ordine/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteOrdine(id);

      if (response.status === 200) {
        Swal.fire("Successo", "Ordine cancellato con successo!", "success");
      }
      return id;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore");
    }
  }
);

const storicoOrdiniSlice = createSlice({
  name: "storicoOrdini",
  initialState,
  reducers: {
    setVisualizzaOrdine: (state, action) => {
      state.visualizzaOrdine = action.payload;
    },
    setOrdiniFiltrati: (state, action) => {
      state.ordiniFiltrati = action.payload;
    },
    setOrdine: (state, action) => {
      state.ordine = state.ordini.find(
        (ordine) => ordine.id === action.payload
      );
    },
    resetFiltro: (state) => {
      state.ordiniFiltrati = state.ordini;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchOrdini
      .addCase(fetchOrdini.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdini.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordini = action.payload;
      })
      .addCase(fetchOrdini.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordini = state.ordini.filter(
          (ordine) => ordine.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //fetchDettagliOrdine
      .addCase(fetchDettagliOrdine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDettagliOrdine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dettagliOrdine = action.payload;
      })
      .addCase(fetchDettagliOrdine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setVisualizzaOrdine,
  setOrdiniFiltrati,
  setOrdine,
  resetFiltro,
} = storicoOrdiniSlice.actions;

export default storicoOrdiniSlice.reducer;
