import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { scan } from "../../services/cartService";

const initialState = {
  barcode: "",
  carrello: JSON.parse(sessionStorage.getItem("carrello")) || [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const scanProdotto = createAsyncThunk(
  "cart/scanProdotto", // Nome dell'azione
  async ({ barcode, userId }, { rejectWithValue }) => {
    try {
      const response = await scan(barcode, userId);
      return response.data.articolo;
    } catch (error) {
      console.error(
        "Errore durante l'aggiunta al carrello:",
        error.response.data.message
      );
      if (error.response && error.response.data) {
        Swal.fire("Errore", error.response.data.message, "error");
        return rejectWithValue(error.response.data.message); // Ritorna l'errore del server
      }
      return rejectWithValue("Errore generico durante l'aggiunta al carrello"); // Errore generico
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
    removeQuantity: (state, action) => {
      const articoloEsistente = state.carrello.find(
        (articolo) => articolo.id === action.payload
      );

      if (articoloEsistente) {
        if (articoloEsistente.quantita > 1) {
          // Crea un nuovo array immutabilmente
          state.carrello = state.carrello.map((articolo) =>
            articolo.id === action.payload
              ? {
                  ...articolo,
                  quantita: articolo.quantita - 1,
                  totaleArticolo: parseFloat(
                    (articolo.quantita - 1) * articolo.prezzoScontato
                  ).toFixed(2), // Aggiorna totaleArticolo
                  ivaTotale: parseFloat(
                    articolo.ivaUnitaria * (articolo.quantita - 1)
                  ).toFixed(2), // Aggiorna ivaTotale
                }
              : articolo
          );
        } else if (articoloEsistente.quantita === 1) {
          // Rimuovi l'articolo dal carrello
          state.carrello = state.carrello.filter(
            (articolo) => articolo.id !== action.payload
          );
        }

        // Aggiorna il sessionStorage
        sessionStorage.setItem("carrello", JSON.stringify(state.carrello));
      }
    },

    removeItem: (state, action) => {
      state.carrello = state.carrello.filter(
        (articolo) => articolo.id !== action.payload
      );
      sessionStorage.setItem("carrello", JSON.stringify(state.carrello));
    },
    resetCarrello: (state) => {
      state.carrello = [];
      sessionStorage.removeItem("carrello");
    },
    aggiornaArticolo: (state, action) => {
      state.carrello = state.carrello.map((articolo) =>
        articolo.id === action.payload.id ? action.payload : articolo
      );
      sessionStorage.setItem("carrello", JSON.stringify(state.carrello));
    },
    cleanCart: (state) => {
      state.carrello = [];
      sessionStorage.removeItem("carrello");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scanProdotto.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(scanProdotto.fulfilled, (state, action) => {
        state.status = "succeeded";

        const articoloEsistente = state.carrello.some(
          (articolo) => articolo.id === action.payload.id
        );

        if (articoloEsistente) {
          // Sostituisci l'articolo esistente con quello nuovo
          state.carrello = state.carrello.map((articolo) =>
            articolo.id === action.payload.id ? action.payload : articolo
          );
        } else {
          // Aggiungi il nuovo articolo al carrello
          state.carrello = [...state.carrello, action.payload];
        }

        // Aggiorna il sessionStorage
        sessionStorage.setItem("carrello", JSON.stringify(state.carrello));
      })

      .addCase(scanProdotto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Mostra l'errore
      });
  },
});

export const {
  setBarcode,
  removeQuantity,
  removeItem,
  resetCarrello,
  aggiornaArticolo,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
