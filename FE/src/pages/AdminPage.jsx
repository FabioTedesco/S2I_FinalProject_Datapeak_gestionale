import Navbar from "../components/Navbar";
import OperatoriList from "../features/admin/OperatoriList";
import AggiungiOperatori from "../features/admin/AggiungiOperatori";
import Footer from "../components/Footer";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center mx-10 space-x-4 mt-10">
        <OperatoriList />
        <AggiungiOperatori />
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
