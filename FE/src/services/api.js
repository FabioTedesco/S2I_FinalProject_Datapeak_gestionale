import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL:
    "http://s2ifinalprojectdatapeakgestio-production.up.railway.app/controllers",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor per le risposte
API.interceptors.response.use(
  (response) => {
    // Gestione della risposta di successo
    return response;
  },
  (error) => {
    // Gestione degli errori
    if (error.response) {
      // Errore con risposta del server
      const status = error.response.status;
      const message = error.response.data?.message || "Errore imprevisto";

      if (status === 401) {
        // Non autorizzato
        Swal.fire(
          "Sessione Scaduta",
          "Effettua di nuovo il login.",
          "warning"
        ).then(() => {
          // Effettua il logout o altre azioni
          window.location.href = "/login"; // Redirige alla pagina di login
        });
      } else if (status === 404) {
        // Risorsa non trovata
        Swal.fire("Errore 404", "Risorsa non trovata.", "error");
      } else if (status === 500) {
        // Errore interno del server
        Swal.fire(
          "Errore 500",
          "Errore interno del server. Riprova più tardi.",
          "error"
        );
      } else {
        // Altri errori
        Swal.fire("Errore", message, "error");
      }
    } else if (error.request) {
      // Nessuna risposta dal server
      Swal.fire(
        "Errore di Connessione",
        "Impossibile connettersi al server. Controlla la tua connessione.",
        "error"
      );
    } else {
      // Errore durante l'impostazione della richiesta
      Swal.fire("Errore", error.message, "error");
    }

    // Rifiuta la promessa per gestirla successivamente nei componenti
    return Promise.reject(error);
  }
);

export default API;
