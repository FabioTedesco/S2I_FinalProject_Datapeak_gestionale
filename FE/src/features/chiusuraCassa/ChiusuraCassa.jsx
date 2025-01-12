import { useEffect, useState } from "react";
import { totaleGiornaliero, closeCassa } from "../../services/cartService";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

function ChiusuraCassa({ setChiusuraCassa }) {
  const [totaleIncassato, setTotaleIncassato] = useState(null);

  const chiusura = async () => {
    try {
      const response = await totaleGiornaliero();
      console.log(response.data);
      setTotaleIncassato(response.data);
      return;
    } catch (error) {
      console.error("Errore durante la chiusura della cassa:", error);
    }
  };

  useEffect(() => {
    chiusura();
  }, []);

  const chiusuraCassa = async () => {
    try {
      const response = await closeCassa();

      if (response.status === 200) {
        Swal.fire("Successo", "Cassa chiusa con successo!", "success");
        setChiusuraCassa(false);
      }
    } catch (error) {
      console.error("Errore durante la chiusura della cassa:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Titolo del Modal */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-center">Chiusura Cassa</h2>
        </div>

        {/* Corpo del Modal */}
        <div className="mb-6">
          <p className="text-lg text-center text-gray-800">
            Il totale incassato oggi è:{" "}
            <span className="font-bold">
              {totaleIncassato !== null ? (
                `€${totaleIncassato}`
              ) : (
                <FontAwesomeIcon icon={faSpinner} />
              )}
            </span>
          </p>
        </div>

        {/* Bottoni di Azione */}
        <div className="flex justify-end space-x-4 border-t pt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setChiusuraCassa(false)}
          >
            Annulla
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => chiusuraCassa()}
          >
            Chiudi cassa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChiusuraCassa;
