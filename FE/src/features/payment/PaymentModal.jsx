import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentModal,
  setEmailCliente,
  setMetodoPagamento,
} from "../../features/payment/paymentSlice";
import { cleanCart } from "../../features/cart/cartSlice";
import { completaOrdine } from "../../services/cartService";
import Swal from "sweetalert2";

function PaymentModal() {
  const dispatch = useDispatch();
  const { metodoPagamento, emailCliente } = useSelector(
    (state) => state.payment
  );

  const { userId } = useSelector((state) => state.auth);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    dispatch(setEmailCliente(email));

    if (email && !validateEmail(email)) {
      setEmailError("Formato email non valido.");
    } else {
      setEmailError("");
    }
  };

  const handleCompleteOrder = async () => {
    if (emailCliente && !validateEmail(emailCliente)) {
      Swal.fire(
        "Errore",
        "Inserisci un'email valida o lascia il campo vuoto.",
        "error"
      );
      return;
    }

    try {
      Swal.fire({
        title: "Il cliente ha pagato?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await completaOrdine({
            operatore_id: userId,
            metodoPagamento,
            emailCliente,
          });

          Swal.fire("Ordine confermato", "", "success");
          dispatch(cleanCart());
          dispatch(setPaymentModal(false));
        } else if (result.isDenied) {
          Swal.fire("Richiesto pagamento");
        }
      });
    } catch (error) {
      console.error("Errore durante il completamento dell'ordine:", error);
      Swal.fire("Errore", "Qualcosa è andato storto. Riprova.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Scegli il Metodo di Pagamento
        </h2>

        {/* Metodo di pagamento */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Metodo di Pagamento
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="contanti"
                checked={metodoPagamento === "contanti"}
                onChange={() => dispatch(setMetodoPagamento("contanti"))}
                className="mr-2"
              />
              Contanti
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="cdc"
                checked={metodoPagamento === "cdc"}
                onChange={() => dispatch(setMetodoPagamento("cdc"))}
                className="mr-2"
              />
              Carta di Credito
            </label>
          </div>
        </div>

        {/* Email cliente (opzionale) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email del Cliente (Opzionale)
          </label>
          <input
            type="email"
            value={emailCliente}
            onChange={handleEmailChange}
            placeholder="Inserisci l'email del cliente"
            className={`w-full p-2 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        {/* Bottoni di azione */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => dispatch(setPaymentModal(false))}
          >
            Annulla
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleCompleteOrder}
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
