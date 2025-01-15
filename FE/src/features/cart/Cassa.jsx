import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import PaymentModal from "../payment/PaymentModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scanProdotto,
  setBarcode,
  removeQuantity,
  removeItem,
  resetCarrello,
  aggiornaArticolo,
} from "./cartSlice";
import { setPaymentModal } from "../payment/paymentSlice";
import {
  removeOne,
  removeAll,
  reset,
  aggiungiSconto,
} from "../../services/cartService";

function Cassa() {
  const dispatch = useDispatch();
  const { barcode, carrello } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.auth);
  const { showModal } = useSelector((state) => state.payment);
  const [sconto, setSconto] = useState(0);

  const handleAddToCart = async () => {
    dispatch(scanProdotto({ barcode, userId }));
    dispatch(setBarcode(""));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddToCart();
    }
  };

  const deleteOne = async (id) => {
    try {
      const response = await removeOne(id);

      if (response.status === 200) {
        dispatch(removeQuantity(id));
      }
    } catch (error) {
      console.error("Errore durante la rimozione del prodotto:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await removeAll(id);

      if (response.status === 200) {
        dispatch(removeItem(id));
      }
    } catch (error) {
      console.error("Errore durante la rimozione del prodotto:", error);
    }
  };

  const addSconto = async (id, sconto) => {
    try {
      const scontoConversion = sconto / 100;
      const response = await aggiungiSconto(id, scontoConversion);

      if (response.status === 200) {
        dispatch(aggiornaArticolo(response.data.articolo));
      }
    } catch (error) {
      console.error("Errore durante l'aggiornamento del prodotto:", error);
    }
  };

  const calculateTotalIva = () => {
    return carrello
      .reduce((sum, articolo) => sum + parseFloat(articolo.ivaTotale || 0), 0)
      .toFixed(2);
  };

  const calculateTotaleOrdine = () => {
    return carrello
      .reduce(
        (sum, articolo) => sum + parseFloat(articolo.totaleArticolo || 0),
        0
      )
      .toFixed(2);
  };

  const calculateTotaleComplessivo = () => {
    return (
      parseFloat(calculateTotalIva()) + parseFloat(calculateTotaleOrdine())
    ).toFixed(2);
  };

  const handleReset = async (id) => {
    const response = await reset(id);
    if (response.status === 200) {
      dispatch(resetCarrello());
      dispatch(setBarcode(""));
    }
  };

  const handleCompleteOrder = () => {
    if (carrello.length > 0) {
      dispatch(setPaymentModal(true));
    }
  };

  return (
    <>
      <div className="relative flex-col mx-16 my-6 p-3 bg-white rounded-lg shadow-md">
        {/* Freccia di ritorno */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Cassa
        </h1>

        {/* Sezione di input per il codice a barre */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            name="barcode"
            type="text"
            placeholder="Inserisci il codice a barre"
            value={barcode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              dispatch(setBarcode(value));
            }}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            testo="Aggiungi al Carrello"
            colore="bg-primary"
            onClick={handleAddToCart}
          />
        </div>

        {/* Tabella Ordine Corrente */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-semibold text-gray-600">
                  articolo id
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600">
                  Nome
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Prezzo Unitario (€)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Prezzo Outlet (€)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Sconto (%)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Prezzo scontato
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Aggiungi Sconto/Gratuito
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Prezzo Finale
                </th>

                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Quantità
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Totale (€)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Iva Totale (€)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Azione
                </th>
              </tr>
            </thead>
            <tbody>
              {carrello.map((articolo) => (
                <tr key={articolo.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-gray-700">
                    {articolo.id}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {articolo.nome}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    €{articolo.prezzoOriginale}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    €{Math.floor(articolo.prezzoOutlet)}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {articolo.scontoProdotto * 100}%
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    €{articolo.prezzoScontato}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    <input
                      className="w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="sconto"
                      type="number"
                      onChange={(e) => setSconto(e.target.value)}
                    />
                    <div className="flex mt-1">
                      <input
                        className="mr-2"
                        name="gratis"
                        type="checkbox"
                        onChange={() => setSconto(100)}
                      />
                      <label>Gratis</label>
                    </div>
                    <Button
                      testo="Aggiungi"
                      onClick={() => addSconto(articolo.id, sconto)}
                      colore="bg-primary"
                      classeAggiuntiva="mt-2 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </td>

                  <td className="py-2 px-4 border-b text-gray-700">
                    €
                    {articolo.prezzoFinale
                      ? articolo.prezzoFinale
                      : articolo.prezzoScontato}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {articolo.quantita}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    €{articolo.totaleArticolo}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    €{articolo.ivaTotale}
                  </td>
                  <td className="flex justify-center py-6 px-4 border-b min-h-28 text-gray-700 space-x-2">
                    {articolo.quantita > 1 && (
                      <button
                        onClick={() => deleteOne(articolo.id)}
                        className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                      >
                        Rimuovi
                      </button>
                    )}
                    <button
                      onClick={() => deleteItem(articolo.id)}
                      className="bg-red-500 text-white font-semibold py-2 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Rimuovi Tutto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totale Ordine */}
        <div className="flex justify-between text-right my-6">
          <Button
            testo="Reset carrello"
            colore="bg-secondary"
            onClick={() => handleReset(carrello[0].carrello_id)}
          />
          <span className="text-xl font-semibold text-gray-800">
            IVA Totale: € {calculateTotalIva()}
            <br />
            Totale Ordine (IVA inclusa): € {calculateTotaleComplessivo()}
          </span>
        </div>

        <Button
          testo="Completa Ordine"
          classeAggiuntiva="bg-green-500 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          colore="green-500"
          onClick={handleCompleteOrder}
        />
      </div>
      {showModal && <PaymentModal />}
    </>
  );
}

export default Cassa;
