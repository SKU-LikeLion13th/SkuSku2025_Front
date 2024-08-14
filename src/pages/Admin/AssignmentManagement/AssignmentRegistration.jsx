import React, { useState, useEffect } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import Breadcrumb from '../../../components/Breadcrumb';
import AssignmentInformation from './AssignmentInformation';
import AssignmentForm from './AssignmentForm';
import DeleteAssignments from './DeleteAssignment';
import IndividualManagement from './IndividualManagement'; // 임포트

const AssignmentRegistration = () => {
  const [view, setView] = useState('main'); // 'main', 'assignments', 'individualManagement' 등으로 구분

  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  const handleClick = () => {
    setView('assignments'); // 과제 관리 페이지로 이동
  };

  const handleShowAssignmentList = () => {
    setView('individualManagement'); // 개인 관리 페이지로 이동
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    setDeleteMode(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

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
    const fetchAssignments = () => {
      const exampleData = [
        {
          id: 1,
          title: '8월 첫째주 과제 안내 [발표1]',
          description: '안녕하세요! 8월 첫째주 과제 안내드립니다.',
        },
        {
          id: 2,
          title: '8월 둘째주 과제 안내 [발표2]',
          description: '안녕하세요! 8월 둘째주 과제 안내드립니다.',
        },
      ];
      setAssignments(exampleData);
    };

    fetchAssignments();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-[-10vh]">
      {view === 'main' && (
        <>
          <div className="flex flex-col items-center mb-32">
            <AssignmentTitle variant="title" className="mb-8">
              FRONT-END
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
            <div className="flex flex-col items-center mb-24">
              <AssignmentTitle variant="title">FRONT-END</AssignmentTitle>
              <AssignmentTitle variant="subtitle">과제 제출</AssignmentTitle>
              <Breadcrumb />
            </div>
            {!showForm ? (
              <div>
                {assignments.length === 0 ? (
                  <div className="text-center text-gray-600 text-xl">등록된 과제가 없습니다!</div>
                ) : deleteMode ? (
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
                <AssignmentForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
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
