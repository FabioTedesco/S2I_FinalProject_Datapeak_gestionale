import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/datapeak.png";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-white py-12 mt-12 sticky top-[100vh]">
      <div className=" flex flex-col justify-around md:flex-row items-center ">
        {/* Assistenza tecnica */}
        <div className="flex items-center mb-4 md:mb-0">
          <p className=" ml-10">
            Assistenza tecnica:{" "}
            <a href="mailto:info@datapeak.it" className="text-blue-400">
              info@datapeak.it
            </a>
          </p>
        </div>

        {/* Social media links */}
        <div className="flex items-center space-x-10 mb-4 md:mb-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
          <img src={logo} alt="logo_datapeak" className="size-16 bg-white" />

          <a
            href="https://www.datapeak.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGlobe} size="3x" />
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center ">
          <p className="">
            &copy; {new Date().getFullYear()} DataPeak. Tutti i diritti
            riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
