import { useDispatch, useSelector } from "react-redux";
import { setVisualizzaOrdine } from "./storicoOrdiniSlice";

const VisualizzaOrdineModal = () => {
  const dispatch = useDispatch();
  const { status, dettagliOrdine, ordine } = useSelector(
    (state) => state.storicoOrdini
  );

  if (status === "loading") {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p>Caricamento dettagli ordine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">BULLPADEL SHOP</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => dispatch(setVisualizzaOrdine(false))}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Store details */}
          <div className="text-center mb-4">
            <p>Indirizzo del Negozio</p>
            <p>Telefono: 0123 456789</p>
          </div>

          {/* Order details */}
          <div className="text-center mb-6">
            <p className="font-bold">Ricevuta di Pagamento</p>
            <p>
              Data:{" "}
              {ordine.created_at.split(" ")[0].split("-").reverse().join("-")}
            </p>
            <p>Numero Ordine: {ordine.id} </p>
          </div>

          {/* Products Table */}
          <table className="min-w-full text-left mb-6">
            <thead>
              <tr>
                <th className="py-1 border-b">Prodotto</th>
                <th className="py-1 border-b text-right">Quantità</th>
                <th className="py-1 border-b text-right">Prezzo</th>

                <th className="py-1 border-b text-right">Totale</th>
              </tr>
            </thead>
            <tbody>
              {dettagliOrdine.map((articolo) => (
                <tr key={articolo.id}>
                  <td className="py-1">{articolo.nome}</td>
                  <td className="py-1 text-right">{articolo.quantita}</td>

                  <td className="py-1 text-right">
                    €
                    {articolo.prezzoFinale
                      ? articolo.prezzoFinale
                      : articolo.prezzoScontato}
                  </td>
                  <td className="py-1 text-right">
                    €{articolo.totaleArticolo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end border-t pt-4">
            <div className="flex flex-col mx-4">
              <p className="font-bold">Totale IVA: </p>
              <p className="font-bold">Totale:</p>
            </div>
            <div className="flex flex-col">
              <p className="">€ {ordine.ivaTotale}</p>
              <p className="">€ {ordine.totale} </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="text-center mt-4">
            <p>Metodo di Pagamento: </p>
            <p>Grazie per aver acquistato da noi!</p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t flex justify-around">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400"
            onClick={() => dispatch(setVisualizzaOrdine(false))}
          >
            Chiudi
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Scarica Ricevuta
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizzaOrdineModal;
