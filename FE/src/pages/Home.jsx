import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import ChiusuraCassa from "../features/chiusuraCassa/ChiusuraCassa";
import SearchProducts from "../features/products/SearchProducts";
import { useSelector } from "react-redux";

function Home() {
  const { role } = useSelector((state) => state.auth);
  const [chiusuraCassa, setChiusuraCassa] = useState(false);

  const handleChiusuraCassa = () => {
    setChiusuraCassa(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-6">
        <SearchProducts isHomePage={true} />
      </div>

      <div className=" flex flex-col items-center p-6">
        <div className="flex space-x-4 mb-10">
          {/* Card Prodotti */}
          <a
            href="/prodotti"
            className="w-48 h-64 bg-slate-300 rounded-lg shadow-md p-4 flex flex-col items-center opacity-90 transform transition-transform hover:scale-105"
          >
            <img
              src="https://media.istockphoto.com/id/1363976548/it/foto/racchetta-da-paddle-tennis-e-palline-sul-campo-da-paddle-blu.webp?a=1&b=1&s=612x612&w=0&k=20&c=b5e-FCTf74iliXIuQ-ztNOTiDcDXUhSCHXQcWLKDNOk="
              alt="Prodotti"
              className="h-32 w-full object-cover rounded mb-4 "
            />
            <h2 className="text-xl font-bold text-primary">Prodotti</h2>
          </a>

          {/* Card Cassa */}
          <a
            href="/cassa"
            className="w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105"
          >
            <img
              src="https://media.istockphoto.com/id/1143208442/it/foto/bancomat-con-schermo-digitale-al-supermercato.webp?a=1&b=1&s=612x612&w=0&k=20&c=jU3plbvEelIVzPfRExsabuZrPlw2845mv3fyYX2IO8I="
              alt="Cassa"
              className="h-32 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold text-primary">Cassa</h2>
          </a>

          {/* Card Storico Ordini */}
          <a
            href="/storico-ordini"
            className="w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105"
          >
            <img
              src="https://media.istockphoto.com/id/184616145/it/foto/larchivio.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ayh0CfXX9Q28eZoR43L52GCqGXoxgKxx95rYDckXjVE="
              alt="Storico Ordini"
              className="h-32 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold text-primary">Storico Ordini</h2>
          </a>

          {/* Card Magazzino */}
          {role === "admin" && (
            <a
              href="/admin"
              className="w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFzaGJvYXJkfGVufDB8fDB8fHww"
                alt="Admin"
                className="h-32 w-full object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold text-primary">Admin</h2>
            </a>
          )}
        </div>

        {/* Card Chiusura Cassa */}
        <div className="w-full max-w-2xl bg-slate-300  rounded-lg shadow-md p-6 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Chiusura Cassa
          </h2>
          <p className="font-bold text-red-500 text-center mb-5">
            Genera report delle vendite giornaliere
          </p>
          <Button
            testo="Procedi"
            colore="bg-primary"
            onClick={handleChiusuraCassa}
          />
        </div>
      </div>
      {chiusuraCassa && <ChiusuraCassa setChiusuraCassa={setChiusuraCassa} />}
      <Footer />
    </>
  );
}

export default Home;
