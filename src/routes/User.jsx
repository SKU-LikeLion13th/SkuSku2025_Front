import { Route, Routes } from 'react-router-dom';
import Main from '../pages/User/Main/Main.jsx';
import Project from '../pages/User/Project/Project.jsx';
import TeamIntro from '../pages/User/TeamIntro/TeamIntro.jsx';
import Contact from '../pages/User/Contact/Contact.jsx';
import BackEnd from '../pages/User/TracksIntro/BackEnd';
import FrontEnd from '../pages/User/TracksIntro/FrontEnd';
import Pm_Design from '../pages/User/TracksIntro/Pm_Design';
import CreateProject from '../pages/User/Project/CreateProject.jsx';
import CyberCampusMain from '../pages/User/CyberCampus/CyberCampusMain/CyberCampusMain.jsx';
import CyberCampusIntro from '../pages/User/CyberCampus/CyberCampusMain/CyberCampusIntro.jsx';

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* project(createProject는 추후 경로 이동) */}
        <Route path="/project" element={<Project />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/teamIntro" element={<TeamIntro />} />
        <Route path="/contact" element={<Contact />} />

        {/* track */}
        <Route path="/backend" element={<BackEnd />} />
        <Route path="/frontend" element={<FrontEnd />} />
        <Route path="/pm_design" element={<Pm_Design />} />

        <Route path="/cyberCampusIntro" element={<CyberCampusIntro />} />
      </Routes>
    </>
  );
};

export default User;
