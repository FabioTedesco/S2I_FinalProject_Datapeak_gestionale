import { update } from "../../services/productsService";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../features/products/productsSlice";
import { deleteProdotto } from "../../services/productsService";

import Swal from "sweetalert2";
import Button from "../../components/Button";

const ModificaProdottoModal = ({ setModificaModal }) => {
  const dispatch = useDispatch();
  const prodotto = useSelector((state) => state.products.prodottoDaModificare);
  const [prezzoOriginale, setPrezzoOriginale] = useState(
    prodotto.prezzoOriginale
  );
  const prezzoOutlet = prodotto.prezzoOutlet;
  const [sconto, setSconto] = useState(prodotto.scontoProdotto * 100);
  const [giacenza, setGiacenza] = useState(prodotto.giacenza);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (
      prezzoOriginale <= 0 ||
      prezzoOriginale === null ||
      prezzoOriginale === ""
    ) {
      newErrors.prezzoOriginale =
        "Il prezzo originale deve essere maggiore di 0.";
    }
    if (sconto < 0 || sconto > 100 || sconto === null || sconto === "") {
      newErrors.sconto = "Lo sconto deve essere compreso tra 0 e 100.";
    }
    if (giacenza <= 0 || giacenza === null || giacenza === "") {
      newErrors.giacenza = "La giacenza deve essere maggiore di 0.";
    }
    return newErrors;
  };

  const handleSalva = async (prodotto) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedData = {
      nome: prodotto.nome,
      id: prodotto.id,
      prezzoOriginale: parseFloat(prezzoOriginale),
      scontoProdotto: parseFloat(sconto) / 100,
      giacenza: parseInt(giacenza, 10),
    };

    try {
      const response = await update(updatedData);

      if (response.status === 200) {
        Swal.fire("Prodotto aggiornato con successo!");
        dispatch(fetchProducts());
      } else {
        console.error(
          "Errore durante l'aggiornamento del prodotto:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Errore durante l'aggiornamento del prodotto:", error);
    }
    setModificaModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProdotto(id);
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire("Prodotto eliminato con successo!");
        dispatch(deleteProduct(id));
        setModificaModal(false);
      }
    } catch (error) {
      console.error("Errore durante la rimozione del prodotto:", error);
    }
  };

  const handleClose = () => {
    setModificaModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        {/* Titolo del modal */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Modifica Prodotto: {prodotto.nome}
          </h2>
        </div>

        {/* Contenuto del modal */}
        <div className="p-6 space-y-4">
          {/* Prezzo Originale */}
          <div className="flex items-center justify-between">
            <label htmlFor="prezzoOriginale" className="font-medium w-1/3">
              Prezzo Originale:
            </label>

            <input
              type="number"
              id="prezzoOriginale"
              value={prezzoOriginale}
              onChange={(e) => setPrezzoOriginale(e.target.value)}
              className={`border rounded px-2 py-1 flex-1 mx-2 ${
                errors.prezzoOriginale ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.prezzoOriginale && (
            <p className="text-red-500 text-sm">{errors.prezzoOriginale}</p>
          )}

          {/* Prezzo Outlet */}
          <div className="flex items-center justify-between">
            <label htmlFor="prezzoOutlet" className="font-medium w-1/3">
              Prezzo Outlet:
            </label>
            <input
              type="number"
              id="prezzoOutlet"
              value={prezzoOutlet}
              readOnly
              className="border rounded px-2 py-1 flex-1 mx-2"
            />
          </div>

          {/* Sconto */}
          <div className="flex items-center justify-between">
            <label htmlFor="sconto" className="font-medium w-1/3">
              Sconto (%):
            </label>
            <input
              type="number"
              id="sconto"
              value={sconto}
              onChange={(e) => setSconto(e.target.value)}
              className={`border rounded px-2 py-1 flex-1 mx-2 ${
                errors.sconto ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.sconto && (
            <p className="text-red-500 text-sm">{errors.sconto}</p>
          )}

          {/* Giacenza */}
          <div className="flex items-center justify-between">
            <label htmlFor="giacenza" className="font-medium w-1/3">
              Giacenza:
            </label>
            <input
              type="number"
              id="giacenza"
              value={giacenza}
              onChange={(e) => setGiacenza(e.target.value)}
              className={`border rounded px-2 py-1 flex-1 mx-2 ${
                errors.giacenza ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.giacenza && (
            <p className="text-red-500 text-sm">{errors.giacenza}</p>
          )}
        </div>

        {/* Pulsanti */}
        <div className="p-4 border-t flex justify-between items-center">
          <Button
            testo="Elimina"
            colore="bg-tertiary"
            onClick={() => handleDelete(prodotto.id)}
          />
          <div className="flex">
            <Button
              testo="Salva"
              colore="bg-primary"
              classeAggiuntiva="mx-3"
              onClick={() => handleSalva(prodotto)}
            />
            <Button testo="Chiudi" colore="bg-gray-400" onClick={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificaProdottoModal;
