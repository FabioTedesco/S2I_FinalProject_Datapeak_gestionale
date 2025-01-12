import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/log_bullpadel.png";

import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex items-center justify-between bg-white bg-opacity-60 h-32 px-6">
      <div className="flex items-center  h-20 px-6">
        <Link to="/" className="ml-10 text-3xl">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>

      <img src={logo} alt="Logo bullpadel" className="h-28 w-auto" />

      <div className="flex items-center">
        <p className="mx-2 font-bold">{user}</p>
        <Button
          testo="Logout"
          colore="bg-tertiary"
          dimensione="sm"
          classeAggiuntiva="mx-2"
          onClick={() => dispatch(logout())}
        />
      </div>
    </nav>
  );
};

export default Navbar;
