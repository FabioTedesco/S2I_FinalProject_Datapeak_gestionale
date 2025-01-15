import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { updateFormData, aggiungiProdottoThunk } from "./addProductsSlice";

function Aggiungi_prodotto() {
  const dispatch = useDispatch();
  const { formData, loading } = useSelector((state) => state.addProducts);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Il nome del prodotto è obbligatorio.";
    }
    if (!formData.barcode.trim()) {
      newErrors.barcode = "Il codice a barre è obbligatorio.";
    }
    if (formData.prezzoOriginale <= 0) {
      newErrors.prezzoOriginale = "Il prezzo deve essere maggiore di 0.";
    }
    if (formData.scontoProdotto < 0 || formData.scontoProdotto > 100) {
      newErrors.scontoProdotto = "Lo sconto deve essere tra 0 e 100%.";
    }
    if (formData.giacenza < 0) {
      newErrors.giacenza = "La giacenza non può essere negativa.";
    } else if (!formData.giacenza) {
      newErrors.giacenza = "La giacenza è obbligatoria";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(aggiungiProdottoThunk(formData));
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="relative max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4"
      >
        <Link
          to="/prodotti"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2 className="text-2xl font-semibold mb-2 ml-10 text-gray-800">
          Aggiungi un nuovo prodotto
        </h2>

        {/* Nome Prodotto */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="nome"
          >
            Nome Prodotto
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.nome ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci il nome del prodotto"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>

        {/* Prezzo */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="prezzoOriginale"
          >
            Prezzo
          </label>
          <input
            type="number"
            name="prezzoOriginale"
            value={formData.prezzoOriginale}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.prezzoOriginale ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci il prezzo"
          />
          {errors.prezzoOriginale && (
            <p className="text-red-500 text-sm">{errors.prezzoOriginale}</p>
          )}
        </div>

        {/* Sconto Prodotto */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="scontoProdotto"
          >
            Sconto (%)
          </label>
          <input
            type="number"
            name="scontoProdotto"
            value={formData.scontoProdotto}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.scontoProdotto ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci lo sconto"
          />
          {errors.scontoProdotto && (
            <p className="text-red-500 text-sm">{errors.scontoProdotto}</p>
          )}
        </div>

        {/* Codice a Barre */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="barcode"
          >
            Codice a Barre
          </label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.barcode ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci il codice a barre"
          />
          {errors.barcode && (
            <p className="text-red-500 text-sm">{errors.barcode}</p>
          )}
        </div>

        {/* Giacenza */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="giacenza"
          >
            Quantità
          </label>
          <input
            type="number"
            name="giacenza"
            value={formData.giacenza}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.giacenza ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci la quantità"
          />
          {errors.giacenza && (
            <p className="text-red-500 text-sm">{errors.giacenza}</p>
          )}
        </div>

        {/* Colore */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="colore"
          >
            Colore
          </label>
          <input
            type="text"
            name="colore"
            value={formData.colore}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserisci il colore del prodotto"
          />
        </div>

        {/* Categoria */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="categoria"
          >
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserisci la categoria del prodotto"
          />
        </div>

        {/* Taglia */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="taglia"
          >
            Taglia Prodotto
          </label>
          <input
            type="text"
            name="taglia"
            value={formData.taglia}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserisci la taglia del prodotto"
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 px-4 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          disabled={loading}
        >
          {loading ? "Salvataggio in corso..." : "Aggiungi Prodotto"}
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Aggiungi_prodotto;
