import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdini,
  deleteOrder,
  setVisualizzaOrdine,
  fetchDettagliOrdine,
  setOrdine,
} from "../../features/storicoOrdini/storicoOrdiniSlice";
import VisualizzaOrdineModal from "./VisualizzaOrdineModal";
import DateFilter from "./DateFilter";

function StoricoOrdini() {
  const { ordini, status, visualizzaOrdine, ordiniFiltrati } = useSelector(
    (state) => state.storicoOrdini
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrdini());
    }
  }, [dispatch, status]);

  // Funzione per eliminare un ordine
  const handleDeleteOrder = (ordineId) => {
    dispatch(deleteOrder(ordineId));
  };

  const handleVisualizzaOrdine = (carrello_id, ordine_id) => {
    dispatch(fetchDettagliOrdine(carrello_id));
    dispatch(setOrdine(ordine_id));
    dispatch(setVisualizzaOrdine(true));
  };

  // const ordiniOrdinati = ordini ? (
  //   [...ordini].sort((a, b) => {
  //     return new Date(b.data) - new Date(a.data);
  //   })
  // ) : (
  //   <p>Non ci sono ordini</p>
  // );

  return (
    <>
      <div className="relative  mt-5 mx-36 p-6 bg-white rounded-lg shadow-md">
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Storico Ordini
        </h1>
        <div className="mb-4">
          <DateFilter />
        </div>

        {/* Tabella Storico Ordini */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  ID Ordine
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Data
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Totale (€)
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Metodo di Pagamento
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Email
                </th>
                <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {ordini &&
              (ordiniFiltrati.length > 0 ? ordiniFiltrati : ordini).length >
                0 ? (
                (ordiniFiltrati.length > 0 ? ordiniFiltrati : ordini).map(
                  (ordine) => (
                    <tr key={ordine.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-gray-700">
                        {ordine.id}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-700">
                        {ordine.created_at}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-700">
                        €{ordine.totale}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-700">
                        {ordine.metodoPagamento}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-700">
                        {ordine.emailCliente}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-700 space-x-2">
                        <div className="flex flex-col sm:flex-row sm:space-x-2">
                          <button
                            className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={() =>
                              handleVisualizzaOrdine(
                                ordine.carrello_id,
                                ordine.id
                              )
                            }
                          >
                            Visualizza Ordine
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(ordine.id)}
                            className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-2 px-4 text-center text-gray-700 font-bold underline"
                  >
                    Non ci sono ordini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {visualizzaOrdine && <VisualizzaOrdineModal />}
    </>
  );
}

export default StoricoOrdini;
