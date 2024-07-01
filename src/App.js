import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop.jsx';
import './css/style.css';
import Main from './pages/Main';
import Project from './pages/Project';
import TeamIntro from './pages/TeamIntro';
import Contact from './pages/Contact';
import BackEnd from './pages/TracksIntro/BackEnd';
import FrontEnd from './pages/TracksIntro/FrontEnd';
import Pm_Design from './pages/TracksIntro/Pm_Design';

function App() {
  return (
    <div className="App text-white">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project" element={<Project />} />
        <Route path="/teamIntro" element={<TeamIntro />} />
        <Route path="/contact" element={<Contact />} />

        {/* track */}
        <Route path="/backEnd" element={<BackEnd />} />
        <Route path="/frontEnd" element={<FrontEnd />} />
        <Route path="/pm_design" element={<Pm_Design />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
