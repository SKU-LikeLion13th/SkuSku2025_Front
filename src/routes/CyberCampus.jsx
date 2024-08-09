import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CyberCampusLecture from '../pages/User/CyberCampus/CyberCampusLecture/CyberCampusLecture';
import CyberCampusAssignment from './../pages/User/CyberCampus/CyberCampusAssignment/CyberCampusAssignment';
import CyberCampusIntro from '../pages/User/CyberCampus/CyberCampusIntro/CyberCampusIntro';

export default function CyberCampus() {
  return (
    <>
      <Routes>
        <Route path="/lecture" element={<CyberCampusLecture />} />
        <Route path="/assignment" element={<CyberCampusAssignment />} />
        <Route path="/intro" element={<CyberCampusIntro />} />
      </Routes>
    </>
  );
}
