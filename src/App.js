import { Route, Routes, useLocation } from 'react-router-dom';
import './css/style.css';
import ScrollToTop from './utils/ScrollToTop.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import MobileNav from './components/MobileNav.jsx';
import { NavbarProvider } from './utils/navbar-context';
import User from './routes/User.jsx';
import Admin from './routes/Admin.jsx';
import { LoginProvider } from './utils/LoginContext.jsx';

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <LoginProvider>
      <NavbarProvider>
        <div className={`${isMainPage ? 'relative w-full min-h-screen' : ''}`}>
          {/* Navbar */}
          <MobileNav />
          <Nav />

          {/* Route */}
          <div className={`App text-white ${isMainPage ? '' : 'mt-[100px]'}`}>
            <Routes>
              <Route path="/*" element={<User />} />
              <Route path="/admin/*" element={<Admin />} />
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