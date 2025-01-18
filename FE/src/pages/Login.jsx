import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { login, auth } from "../services/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Stato per gli errori
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Il campo username è obbligatorio.";
    }

    if (!password) {
      validationErrors.password = "Il campo password è obbligatorio.";
    } else if (password.length < 5) {
      validationErrors.password =
        "La password deve contenere almeno 5 caratteri.";
    }

    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await login(username, password);
      dispatch(setToken(data.data));
      const authentication = await auth();
      dispatch(setLogin(authentication.data.data));

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire("Errore", "Credenziali non valide. Riprova.", "error");
    }
  };

  return (
    <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat min-h-screen w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Inserisci il tuo username"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Inserisci la tua password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#0d1829] rounded-lg hover:bg-[#152238] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
