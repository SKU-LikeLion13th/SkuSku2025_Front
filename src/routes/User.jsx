import { Route, Routes } from 'react-router-dom';
import Main from '../pages/User/Main/Main.jsx';
import Project from '../pages/User/Project/Project.jsx';
import TeamIntro from '../pages/User/TeamIntro/TeamIntro.jsx';
import Contact from '../pages/User/Contact/Contact.jsx';
import BackEnd from '../pages/User/TracksIntro/BackEnd';
import FrontEnd from '../pages/User/TracksIntro/FrontEnd';
import Pm_Design from '../pages/User/TracksIntro/Pm_Design';

const User = () => {
  return (
    <>
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
    </>
  );
};

export default User;
