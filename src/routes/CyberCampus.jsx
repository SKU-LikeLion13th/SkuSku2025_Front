import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import CyberCampusLecture from '../pages/User/CyberCampus/CyberCampusLecture/CyberCampusLecture';
import CyberCampusAssignment from './../pages/User/CyberCampus/CyberCampusAssignment/CyberCampusAssignment';
import CyberCampusIntro from '../pages/User/CyberCampus/CyberCampusIntro/CyberCampusIntro';
import TodaysAssignment from '../pages/User/CyberCampus/CyberCampusAssignment/TodaysAssignment/TodaysAssignment';
import ProgressingAssignment from '../pages/User/CyberCampus/CyberCampusAssignment/ProgressingAssignment/ProgressingAssignment';
import CompletedAssignment from '../pages/User/CyberCampus/CyberCampusAssignment/CompletedAssignment/CompletedAssignment';
import TodaysDetail from '../pages/User/CyberCampus/CyberCampusAssignment/TodaysAssignment/TodaysDetail';
import ProgressingDetails from '../pages/User/CyberCampus/CyberCampusAssignment/ProgressingAssignment/ProgressingDetails';
import CompletedDetails from '../pages/User/CyberCampus/CyberCampusAssignment/CompletedAssignment/CompletedDetails';
import IntroTrack from '../pages/User/CyberCampus/CyberCampusIntro/IntroTrack';

export default function CyberCampus() {
  return (
    <>
      <Routes>
        <Route path="intro" element={<Outlet />}>
          <Route index element={<CyberCampusIntro />} />
          <Route path=":track" element={<Outlet />}>
            <Route index element={<IntroTrack />} />
            <Route path="lecture" element={<CyberCampusLecture />} />
            <Route path="assignment" element={<Outlet />}>
              <Route index element={<CyberCampusAssignment />} />
              <Route path="todaysAssignment" element={<Outlet />}>
                <Route index element={<TodaysAssignment />} />
                <Route path="todaysDetail/:assignmentId" element={<TodaysDetail />} />
              </Route>
              <Route path="progressingAssignment" element={<Outlet />}>
                <Route index element={<ProgressingAssignment />} />
                <Route path="progressingDetail/:assignmentId" element={<ProgressingDetails />} />
              </Route>
              <Route path="completedAssignment" element={<Outlet />}>
                <Route index element={<CompletedAssignment />} />
                <Route path="completedDetail/:assignmentId" element={<CompletedDetails />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
