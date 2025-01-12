import API from "./api";

// Funzione per ottenere tutti i prodotti
export const getProducts = (offset = 0) =>
  API.get("/prodotti/read.php" + `?offset=${offset}`);

export const getCategories = () => API.get("/prodotti/categories.php");

// Inserisci nuovo prodotto
export const createProduct = (prodotto) =>
  API.post("/prodotti/create.php", prodotto);

// Funzione per filtrare i prodotti
export const filterProdotti = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  return API.get(`/prodotti/filter.php?${queryString}`);
};

//Funzione per aggiornare la quantità
export const update = (data) => API.put(`/prodotti/update.php`, data);

export const deleteProdotto = (id) =>
  API.delete(`/prodotti/delete.php`, { data: { id } });
