import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AssignmentRegistration from '../pages/Admin/AssignmentManagement/AssignmentRegistration';

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/assignmentRegistration" element={<AssignmentRegistration />} />
      </Routes>
    </div>
  );
};

export default Admin;
