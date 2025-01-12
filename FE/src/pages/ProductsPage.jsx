import Products from "../features/products/Products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchProducts from "../features/products/SearchProducts";

import { useSelector } from "react-redux";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductsPage = () => {
  const { status, error } = useSelector((state) => state.products);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
        <Footer />
      </>
    );
  }

  if (status === "failed") {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-44 text-xl">
          Errore durante il caricamento dei prodotti: {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <h1 className="text-center text-3xl font-bold mt-4">
          Prodotti Disponibili
        </h1>
        <section className="flex items-center justify-center">
          <SearchProducts isHomePage={false} />
        </section>

        <Products />
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
