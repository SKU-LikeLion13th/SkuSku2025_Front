import React, { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import AssignmentManagement from "./../pages/Admin/AssignmentManagement/AssignmentRegistration.jsx";
import ProjectManagement from "./../pages/Admin/ProjectManagement/ProjectManagement";
import LectureManagement from "./../pages/Admin/LectureManagement/LectureManagement";
import CreateProject from "../pages/Admin/ProjectManagement/ProjectCUD/CreateProject.jsx";
import UpdateProject from "../pages/Admin/ProjectManagement/ProjectCUD/UpdateProject/UpdateProject.jsx";
import DeleteProject from "../pages/Admin/ProjectManagement/ProjectCUD/DeleteProject.jsx";
import UpdateDetail from "../pages/Admin/ProjectManagement/ProjectCUD/UpdateProject/UpdateDetail.jsx";
import AdminMain from "../pages/Admin/AdminMain.jsx";
import AssignmentIntro from "../pages/Admin/AssignmentManagement/AssignmentIntro.jsx";
import LectureManagementMain from "../pages/Admin/LectureManagement/LectureManagementMain.jsx";
import { useLogin } from "../utils/LoginContext.jsx";

const Admin = () => {
  const { checkLoginExpiration } = useLogin();

  useEffect(() => {
    checkLoginExpiration();
  }, []);

  return (
    <Routes>
      <Route path="main" element={<Outlet />}>
        <Route index element={<AdminMain />} />
        <Route path="assignmentIntro" element={<AssignmentIntro />} />
        <Route path="assignmentManagement" element={<AssignmentManagement />} />
        <Route path="lectureManagementMain" element={<Outlet />}>
          <Route index element={<LectureManagementMain />} />
          <Route path=":track" element={<LectureManagement />} />
        </Route>
        <Route path="projectManagement" element={<Outlet />}>
          <Route index element={<ProjectManagement />} />
          <Route path="createProject" element={<CreateProject />} />
          <Route path="deleteProject" element={<DeleteProject />} />
          <Route path="updateProject" element={<Outlet />}>
            <Route index element={<UpdateProject />} />
            <Route path=":id" element={<UpdateDetail />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Admin;
