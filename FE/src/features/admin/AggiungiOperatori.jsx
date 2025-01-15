import { useState } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { createOperatore, setStatus } from "./adminSlice";
import Swal from "sweetalert2";

const AggiungiOperatori = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Validazione del form
  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Il nome utente è obbligatorio.";
    }
    if (!password) {
      newErrors.password = "La password è obbligatoria.";
    } else if (password.length < 5) {
      newErrors.password = "La password deve avere almeno 5 caratteri.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Le password non coincidono.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = { username, password, role };

    try {
      await dispatch(createOperatore(newUser)).unwrap();
      Swal.fire("Successo", "Operatore creato con successo!", "success");
      dispatch(setStatus("idle"));

      // Reset dei campi del form
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("Admin");
      setErrors({});
    } catch (error) {
      Swal.fire("Errore", error || "Errore durante la creazione.", "error");
    }
  };

  return (
    <div className="w-1/3 p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          Aggiungi Operatore
        </h2>

        {/* Campo Username */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Inserisci username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Campo Password */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Crea password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Conferma Password */}
        <div className="mb-2">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Conferma Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Conferma password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Ruolo */}
        <div className="flex justify-center my-6 space-x-2">
          <label>
            <input
              type="radio"
              value="Admin"
              checked={role === "Admin"}
              onChange={() => setRole("Admin")}
              className="mr-2"
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="User"
              checked={role === "User"}
              onChange={() => setRole("User")}
              className="mr-2"
            />
            User
          </label>
        </div>

        {/* Bottone di Submit */}
        <Button
          testo="Aggiungi"
          colore="bg-primary"
          classeAggiuntiva="w-full text-white font-semibold py-2 px-4 rounded hover:opacity-80"
        />
      </form>
    </div>
  );
};

export default AggiungiOperatori;
