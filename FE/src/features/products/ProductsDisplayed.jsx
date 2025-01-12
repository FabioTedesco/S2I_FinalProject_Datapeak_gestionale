import { useSelector, useDispatch } from "react-redux";

import {
  fetchProducts,
  setPagina,
  setSearch,
  setStatus,
  setCategoriaSelected,
} from "./productsSlice";

const ProductsDisplayed = () => {
  const dispatch = useDispatch();
  const { pagina, prodotti, paginationVisibile } = useSelector(
    (state) => state.products
  );

  if (!paginationVisibile) {
    return null;
  }

  const handleAvanti = () => {
    const nuovaPagina = pagina + 30;
    dispatch(setPagina(nuovaPagina));

    dispatch(fetchProducts(nuovaPagina));
  };
  const handleIndietro = () => {
    const nuovaPagina = pagina - 30;
    dispatch(setPagina(nuovaPagina));

    dispatch(fetchProducts(nuovaPagina));
  };

  return (
    <>
      <div className="flex flex-col items-center my-3">
        {/* Messaggio prodotti visualizzati */}
        <div className="flex items-center justify-between">
          {pagina > 120 && (
            <button
              className={`text-white font-bold bg-[#0d1829] px-4 py-2 mr-2 border border-gray-400 rounded 
              ${pagina === 0 ? "opacity-50 cursor-not-allowed disabled" : ""}`}
              disabled={pagina === 0}
              onClick={() => {
                dispatch(setSearch(""));
                dispatch(setStatus("idle"));
                dispatch(setCategoriaSelected("NO FILTRI"));
                dispatch(setPagina(0));
              }}
            >
              &lt;&lt;
            </button>
          )}

          {/* Pulsante indietro */}
          <button
            className={`text-white font-bold bg-[#0d1829] px-4 py-2 border border-gray-400 rounded 
            ${pagina === 0 ? "opacity-50 cursor-not-allowed disabled" : ""}`}
            disabled={pagina === 0}
            onClick={() => handleIndietro()}
          >
            &lt;
          </button>

          {/* Testo centrato */}
          <p className="text-gray-700 text-center m-4">
            <span className="font-bold">Prodotti visualizzati: </span>
            {prodotti ? pagina : "non ci sono prodotti da visualizzare"}
          </p>

          {/* Pulsante avanti */}
          <button
            className={`text-white font-bold bg-[#0d1829] px-4 py-2 border border-gray-400 rounded `}
            onClick={() => handleAvanti()}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsDisplayed;
