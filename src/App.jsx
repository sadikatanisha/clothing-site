import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
