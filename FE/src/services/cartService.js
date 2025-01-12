import API from "./api";

export const scan = (barcode, operatore_id) => {
  return API.post("/carrello/scan.php", { barcode, operatore_id });
};

export const removeOne = (id) =>
  API.delete(`/carrello/removeOne.php`, { data: { id } });

export const removeAll = (id) =>
  API.delete(`/carrello/removeAll.php`, { data: { id } });

export const reset = (id) =>
  API.delete(`/carrello/resetCarrello.php`, { data: { id } });

export const aggiungiSconto = (id, scontoAggiunto) =>
  API.put(`/carrello/aggiungiSconto.php`, { id, scontoAggiunto });

export const completaOrdine = async ({
  operatore_id,
  metodoPagamento,
  emailCliente,
}) => {
  try {
    const response = await API.post("/carrello/completaOrdine.php", {
      operatore_id,
      metodoPagamento,
      emailCliente,
    });
    return response;
  } catch (error) {
    console.error(
      "Errore nella chiamata completaOrdine:",
      error.response || error
    );
    throw error;
  }
};

export const closeCassa = async () => {
  return API.post("/totale/chiusuraCassa.php");
};

export const totaleGiornaliero = async () => {
  return API.get("/ordini/totaleGiornaliero.php");
};
