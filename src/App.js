import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./css/style.css";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import MobileNav from "./components/MobileNav.jsx";
import { NavbarProvider } from "./utils/navbar-context";
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";
import { LoginProvider } from "./utils/LoginContext.jsx";
import CyberCampus from "./routes/CyberCampus.jsx";
import NewNav from "./components/NewNav.jsx";

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const isAdminOrCyberCampusPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/cyberCampus") ||
    location.pathname.startsWith("/cybercampus");

  return (
    <LoginProvider>
      <NavbarProvider>
        <div
          className={`min-h-screen ${
            isAdminOrCyberCampusPage
              ? "bg-white text-black"
              : "bg-black text-white"
          } ${isMainPage ? "relative w-full min-h-screen" : ""}`}
        >
          <MobileNav isAdminOrCyberCampusPage={isAdminOrCyberCampusPage} />
          <NewNav />

          {/* Route */}
          <div className="App">
            <Routes>
              <Route path="/*" element={<User />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/cyberCampus/*" element={<CyberCampus />} />
            </Routes>
            <Footer />
            <ScrollToTop />
          </div>
        </div>
      </NavbarProvider>
    </LoginProvider>
  );
}

export default App;
