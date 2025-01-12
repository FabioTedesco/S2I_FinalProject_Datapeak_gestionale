import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import { fetchUsers, deleteOperatore } from "./adminSlice";
import Swal from "sweetalert2";

const OperatoriList = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.admin);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Sei sicuro di vole eliminare questo operatore?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOperatore(id));
      }
    });
  };

  return (
    <>
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5  text-gray-800">Operatori</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                Id
              </th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                Username
              </th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                Ruolo
              </th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600 text-left">
                Azione
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id || `user-${index}`}
                className="hover:bg-gray-100"
              >
                <td className="py-2 px-4 border-b text-gray-700">{user.id}</td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {user.username ? user.username : "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {user.role}{" "}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  <Button
                    testo="Cancella"
                    colore="bg-secondary"
                    onClick={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OperatoriList;
