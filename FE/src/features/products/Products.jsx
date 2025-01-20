import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import { useState } from "react";
import ModificaProdottiModal from "./ModificaProdottiModal";
import ProductsDisplayed from "./ProductsDisplayed";
import { setProdottoDaModificare } from "./productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { prodotti } = useSelector((state) => state.products);
  const [modificaModal, setModificaModal] = useState(false);

  const handleModifica = (prodotto) => {
    setModificaModal(true);

    dispatch(setProdottoDaModificare(prodotto));
  };

  return (
    <>
      <ProductsDisplayed />
      <section className="relative max-w-7xl mt-5 mx-auto p-6 bg-white rounded-lg shadow-md ">
        <table className="min-w-full bg-white border border-gray-200 opacity-90">
          <thead>
            <tr>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Id
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Nome Prodotto
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Originale(€)
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Outlet (€)
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Sconto (%)
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Prezzo Scontato
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Codice a barre
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Quantità
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Colore
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Categoria
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Taglia
              </th>
              <th className="p-2 border-b font-semibold text-gray-600 text-left underline">
                Modifica
              </th>
            </tr>
          </thead>
          <tbody>
            {prodotti &&
              prodotti.map((prodotto) => (
                <tr
                  key={prodotto.id}
                  className={`${
                    prodotto.id % 2 === 0 ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <td className="p-2 border-b text-gray-700 ">{prodotto.id}</td>
                  <td className="p-2 border-b text-gray-700 ">
                    {prodotto.nome}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    €{prodotto.prezzoOriginale}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    €{Math.floor(prodotto.prezzoOutlet)}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.scontoProdotto * 100}%
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    €
                    {prodotto.scontoProdotto === 0
                      ? prodotto.prezzoOutlet
                      : (
                          prodotto.prezzoOutlet *
                          (1 - prodotto.scontoProdotto)
                        ).toFixed(2)}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.barcode}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.giacenza}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.colore}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.categoria}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    {prodotto.taglia ? prodotto.taglia : "//"}
                  </td>
                  <td className="p-2 border-b text-gray-700">
                    <Button
                      testo="Modifica"
                      colore="bg-secondary"
                      dimensione="sm"
                      onClick={() => handleModifica(prodotto)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      {modificaModal && (
        <ModificaProdottiModal setModificaModal={setModificaModal} />
      )}
    </>
  );
};

export default Products;
