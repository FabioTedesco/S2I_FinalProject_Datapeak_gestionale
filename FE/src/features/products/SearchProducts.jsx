import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setProdottiFiltrati,
  setCategoriaSelected,
  fetchProducts,
  setPaginationVisibile,
  setStatus,
} from "./productsSlice";

import { getCategories, filterProdotti } from "../../services/productsService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSliders,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const SearchProducts = ({ isHomePage = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, categoriaSelected, status } = useSelector(
    (state) => state.products
  );

  const [showCategories, setShowCategories] = useState(false);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const categories = async () => {
    const response = await getCategories();
    return ["NO FILTRI", ...response.data];
  };

  useEffect(() => {
    categories().then((data) => {
      setCategorie(data);
    });
  }, []);

  const handleAddProduct = () => {
    navigate("/aggiungi-prodotto");
  };

  const filter = async () => {
    try {
      let params = {};

      if (/^\d+$/.test(search)) {
        params.barcode = search;
      } else if (categoriaSelected !== "NO FILTRI") {
        params.categoria = categoriaSelected;
      } else {
        params.nome = search;
      }

      // Chiama il servizio di filtro
      const response = await filterProdotti(params);

      // Aggiorna lo stato con i risultati
      dispatch(setProdottiFiltrati(response.data.data));

      dispatch(setPaginationVisibile(false));

      if (isHomePage) {
        navigate("/prodotti");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="mr-4 px-4 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-[#152238]"
        onClick={handleAddProduct}
      >
        <FontAwesomeIcon icon={faPlus} /> Prodotto
      </button>
      <div className="flex rounded-full bg-primary px-2 w-full max-w-[600px] my-5 relative">
        {/* Pulsante per mostrare le categorie */}
        <button
          className="text-white font-bold self-center flex p-1 cursor-pointer bg-primary rounded-full"
          onClick={() => setShowCategories((prev) => !prev)} // Mostra/nascondi tendina
        >
          {categoriaSelected === "NO FILTRI" ? (
            <FontAwesomeIcon icon={faSliders} style={{ color: "white" }} />
          ) : (
            `${categoriaSelected.toString().toUpperCase()}`
          )}
        </button>

        <input
          placeholder="Inserisci Nome prodotto o Codice a barre ..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full bg-primary flex pl-2 text-[#cccccc] outline-0"
        />
        <button
          type="submit"
          className="relative p-2 bg-primary rounded-full"
          onClick={() => filter()}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white" }}
          />
        </button>

        {(categoriaSelected !== "NO FILTRI" || search !== "") && (
          <button
            className="ml-4 px-4 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-[#152238]"
            onClick={() => {
              dispatch(setSearch(""));
              dispatch(setStatus("idle"));
              dispatch(setCategoriaSelected("NO FILTRI"));
              dispatch(setPaginationVisibile(true));
            }}
          >
            Reset
          </button>
        )}

        {/* Tendina delle categorie */}
        {showCategories && (
          <div className="absolute top-12 left-0 bg-white w-full rounded shadow-lg z-10">
            <ul className="py-2 max-h-[280px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {categorie.map((categoria, index) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-slate-200 hover:bg-gray-100 border-b border-black cursor-pointer"
                  onClick={() => {
                    setShowCategories(false);
                    dispatch(setCategoriaSelected(categoria));
                  }}
                >
                  {categoria}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
