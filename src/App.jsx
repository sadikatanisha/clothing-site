import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className="min-h-[calc(100vh-196px)]">
        <Outlet />
      </div>
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
