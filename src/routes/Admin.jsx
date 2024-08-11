import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AssignmentManagement from './../pages/Admin/AssignmentManagement/AssignmentRegistration.jsx';
import ProjectManagement from './../pages/Admin/ProjectManagement/ProjectManagement';
import LectureManagement from './../pages/Admin/LectureManagement/LectureManagement';
import CreateProject from '../pages/Admin/ProjectManagement/CreateProject.jsx';
import UpdateProject from './../pages/Admin/ProjectManagement/UpdateProject';
import DeleteProject from './../pages/Admin/ProjectManagement/DeleteProject';
import UpdateDetail from '../pages/Admin/ProjectManagement/UpdateDetail.jsx';

const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/assignmentManagement" element={<AssignmentManagement />} />
        <Route path="/lectureManagement" element={<LectureManagement />} />

        {/* project */}
        <Route path="/projectManagement" element={<ProjectManagement />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/deleteProject" element={<DeleteProject />} />
        <Route path="/updateProject" element={<UpdateProject />} />
        <Route path="/updateDetail/:id" element={<UpdateDetail />} />
      </Routes>
    </>
  );
};

export default Admin;
