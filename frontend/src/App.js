import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="main__container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
