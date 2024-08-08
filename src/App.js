import { Route, Routes, useLocation } from 'react-router-dom';
import './css/style.css';
import ScrollToTop from './utils/ScrollToTop.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import MobileNav from './components/MobileNav.jsx';
import { NavbarProvider } from './utils/navbar-context';
import User from './routes/User.jsx';
import Admin from './routes/Admin.jsx';
import { getToken } from './utils/Authenticate.js';

function App() {
  // 토큰이 있다면 토큰이 리턴되어 True, 없다면 null이 리턴되어 False 
  const ACCESS_TOKEN = getToken()

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <>
      <div className={`${isMainPage ? 'relative w-full min-h-screen' : ''}`}>
        <NavbarProvider>
          {/* Navbar */}
          <MobileNav ACCESS_TOKEN={ACCESS_TOKEN}/>
          <Nav ACCESS_TOKEN={ACCESS_TOKEN} />

          {/* Route */}
          <div className={`App text-white ${isMainPage ? '' : 'mt-[100px]'}`}>
            <Routes>
              <Route path="/*" element={<User />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
            <Footer />
            <ScrollToTop />
          </div>
        </NavbarProvider>
      </div>
    </>
  );
}

export default App;
