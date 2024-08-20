import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AssignmentTitle from '../../../components/AssignmentTitle';
import Breadcrumb from '../../../components/Breadcrumb';
import AssignmentInformation from './AssignmentInformation';
import AssignmentForm from './AssignmentForm';
import DeleteAssignments from './DeleteAssignment';
import IndividualManagement from './IndividualManagement';

const AssignmentRegistration = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trackType = queryParams.get('track'); // 쿼리 파라미터에서 track 값을 가져옴

  const [view, setView] = useState('main');
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  const handleClick = () => setView('assignments');
  const handleShowAssignmentList = () => setView('individualManagement');
  const handleAddClick = () => setShowForm(true);
  const handleDeleteClick = () => setDeleteMode(true);

  const handleFormSubmit = newAssignment => {
    setAssignments([...assignments, newAssignment]);
    setShowForm(false);
  };

  const handleFormCancel = () => setShowForm(false);

  const handleSelectAssignment = assignmentId => {
    setSelectedAssignments(prev =>
      prev.includes(assignmentId) ? prev.filter(id => id !== assignmentId) : [...prev, assignmentId],
    );
  };

  const handleDeleteSelected = () => {
    setAssignments(prev => prev.filter(assignment => !selectedAssignments.includes(assignment.id)));
    setDeleteMode(false);
    setSelectedAssignments([]);
  };

  const handleDeleteAll = () => {
    setAssignments([]);
    setDeleteMode(false);
    setSelectedAssignments([]);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        const response = await axios.get('https://back.sku-sku.com/assignment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: trackType.toUpperCase(), // trackType을 동적으로 설정
            status: 'TODAY',
          },
        });

        const { assignments } = response.data;
        setAssignments(assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [trackType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-[-10vh]">
      {view === 'main' && (
        <>
          <div className="flex flex-col items-center mb-32">
            <AssignmentTitle variant="title" className="mb-8">
              {trackType?.replace('_', ' ')}
            </AssignmentTitle>
            <AssignmentTitle variant="subtitle" className="mb-12">
              과제 제출 관리
            </AssignmentTitle>
          </div>
          <div className="flex space-x-28">
            <div className="p-7 bg-[#b9cfff] rounded-lg shadow-lg w-72 h-36 cursor-pointer" onClick={handleClick}>
              <div className="text-2xl fontBold mb-4 text-[#323232]">오늘의 과제 관리</div>
              <p className="text-base text-[#323232] fontLight">신규과제를 등록해주세요</p>
            </div>
            <div
              className="p-7 bg-[#fcbd8f] rounded-lg shadow-lg w-72 h-36 cursor-pointer"
              onClick={handleShowAssignmentList}>
              <div className="text-2xl fontBold mb-4 text-[#323232] ">진행중인 과제 관리</div>
              <p className="text-base text-[#323232] fontLight">
                아기사자들의 과제를 확인해주세요 미통과 처리 시 피드백을 남겨주세요!
              </p>
            </div>
          </div>
        </>
      )}
      {view === 'assignments' && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full max-w-4xl mx-auto">
          <div className="w-full">
            <div className="flex flex-col items-center mb-24 mt-20">
              <AssignmentTitle variant="title">{trackType?.replace('_', ' ')}</AssignmentTitle>
              <AssignmentTitle variant="subtitle">과제 제출</AssignmentTitle>
              <Breadcrumb />
            </div>
            {!showForm ? (
              <div>
                {deleteMode ? (
                  <DeleteAssignments
                    assignments={assignments}
                    selectedAssignments={selectedAssignments}
                    onSelectAssignment={handleSelectAssignment}
                    onDeleteAll={handleDeleteAll}
                    onDeleteSelected={handleDeleteSelected}
                    onCancel={() => setDeleteMode(false)}
                  />
                ) : (
                  <AssignmentInformation
                    assignments={assignments}
                    onAddClick={handleAddClick}
                    onDeleteClick={handleDeleteClick}
                  />
                )}
              </div>
            ) : (
              <div className="w-full mx-auto">
                <AssignmentForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} trackType={trackType} />
              </div>
            )}
          </div>
        </div>
      )}
      {view === 'individualManagement' && <IndividualManagement />}
    </div>
  );
};

export default AssignmentRegistration;
