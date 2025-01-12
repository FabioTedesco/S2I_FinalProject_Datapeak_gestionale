import API from "./api";

// Funzione per ottenere tutti gli ordini
export const getOrdini = () => API.get("/ordini/getOrdini.php");

// Funzione per eliminare un ordine
export const deleteOrdine = (id) =>
  API.delete(`/ordini/delete.php`, { data: { id } });

export const filterByDate = (startDate, endDate) => {
  return API.get(`/ordini/filterByDate.php`, {
    params: {
      startDate: `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`,
      endDate:
        endDate &&
        `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(endDate.getDate()).padStart(2, "0")} 23:59:59`,
    },
  });
};

export const getOrderDetails = (carrello_id) => {
  return API.post(`/ordini/getOrderDetails.php`, { carrello_id });
};
