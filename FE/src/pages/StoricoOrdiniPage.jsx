import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StoricoOrdini from "../features/storicoOrdini/StoricoOrdini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const StoricoOrdiniPage = () => {
  const { status } = useSelector((state) => state.storicoOrdini);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <StoricoOrdini />
      <Footer />
    </>
  );
};

export default StoricoOrdiniPage;
