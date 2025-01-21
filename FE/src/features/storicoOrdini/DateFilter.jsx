// src/components/DateFilter.js
import React, { useState } from "react";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { filterByDate } from "../../services/ordersService";
import {
  setOrdiniFiltrati,
  resetFiltro,
} from "../../features/storicoOrdini/storicoOrdiniSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const DateFilter = () => {
  const dispatch = useDispatch();
  const { ordiniFiltrati } = useSelector((state) => state.storicoOrdini);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Funzione per filtrare ordini per intervallo di date
  const filtro = async (startDate, endDate) => {
    if (!startDate) {
      Swal.fire("Data iniziale mancante");
      return;
    }
    try {
      const response = await filterByDate(startDate, endDate);

      if (response.data.ordini) {
        dispatch(setOrdiniFiltrati(response.data.ordini));
      } else {
        Swal.fire({
          title: "Non ci sono ordini nel periodo specificato",
          icon: "warning",
        });
      }
      return;
    } catch (error) {
      // Gestione degli errori
      console.error(
        "Errore durante il filtraggio degli ordini per date:",
        error
      );
      throw error;
    }
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    dispatch(resetFiltro());
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Filtro per Data</h2>
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col items-start">
          <label className="mb-2 text-sm font-medium">Data Iniziale:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-2 border border-gray-300 rounded"
            placeholderText="Seleziona data iniziale"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-2 text-sm font-medium">Data Finale:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-2 border border-gray-300 rounded"
            placeholderText="Seleziona data finale"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-[#0d1829] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => filtro(startDate, endDate)}
        >
          Filtra ordini
        </button>

        {ordiniFiltrati.length > 0 && (
          <Button
            testo="Reset"
            colore="bg-primary"
            onClick={() => {
              reset();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DateFilter;
