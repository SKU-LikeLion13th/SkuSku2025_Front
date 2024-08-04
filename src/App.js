import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop.jsx';
import './css/style.css';
import Main from './pages/Main/Main.jsx';
import Project from './pages/Project';
import TeamIntro from './pages/TeamIntro';
import Contact from './pages/Contact';
import BackEnd from './pages/TracksIntro/BackEnd';
import FrontEnd from './pages/TracksIntro/FrontEnd';
import Pm_Design from './pages/TracksIntro/Pm_Design';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import { useEffect, useState } from 'react';
import MobileNav from './components/MobileNav.jsx';
import { NavbarProvider } from './utils/navbar-context';

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <>
    <NavbarProvider>
      <MobileNav /><Nav />
      <div className={`App text-white ${isMainPage ? '' : 'mt-[100px]'}`}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/project" element={<Project />} />
          <Route path="/teamIntro" element={<TeamIntro />} />
          <Route path="/contact" element={<Contact />} />

          {/* track */}
          <Route path="/backend" element={<BackEnd />} />
          <Route path="/frontend" element={<FrontEnd />} />
          <Route path="/pm_design" element={<Pm_Design />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </NavbarProvider>
    </>
  );
}

export default App;
