import React, { useState, useEffect } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import AssignmentDetail from './AssignmentDetail';

const IndividualManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [totalTasks, setTotalTasks] = useState(28);

  useEffect(() => {
    const exampleData = [
      {
        id: 1,
        name: '김찬주',
        todayTask: '1/2',
        ongoingTask: '3/5',
        completedTask: 21,
        tasks: [
          { id: 1, title: '8월 첫째주 과제 안내 [발표1]', submitted: true, fileAttached: true },
          { id: 2, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
        ],
        ongoingTasks: [
          { id: 1, title: '8월 첫째주 과제 안내 [발표1]', submitted: true, fileAttached: true },
          { id: 2, title: '8월 첫째주 과제 안내 [발표2]', submitted: true, fileAttached: true },
          { id: 3, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
          { id: 4, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
        ],
      },
      {
        id: 2,
        name: '김흥수',
        todayTask: '1/2',
        ongoingTask: '3/5',
        completedTask: 21,
        tasks: [
          { id: 1, title: '8월 첫째주 과제 안내 [발표1]', submitted: true, fileAttached: true },
          { id: 2, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
        ],
        ongoingTasks: [
          { id: 1, title: '8월 첫째주 과제 안내 [발표1]', submitted: true, fileAttached: true },
          { id: 2, title: '8월 첫째주 과제 안내 [발표2]', submitted: true, fileAttached: true },
          { id: 3, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
          { id: 4, title: '8월 첫째주 과제 안내 [발표2]', submitted: false, fileAttached: false },
        ],
      },
      // 다른 아기사자 데이터들 추가
    ];

    setAssignments(exampleData);
  }, []);

  const handleNameClick = assignment => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      {selectedAssignment ? (
        <AssignmentDetail assignment={selectedAssignment} />
      ) : (
        <>
          <div className="flex flex-col items-center mb-16">
            <AssignmentTitle variant="title" className="mb-8">
              FRONT-END
            </AssignmentTitle>
            <AssignmentTitle variant="subtitle" className="mb-8">
              진행 중인 과제 목록
            </AssignmentTitle>
          </div>
          <div className="text-left mb-4">
            <span className="text-xl fontBold">아기사자 과제 관리</span>
            <span className="text-sm text-gray-500 ml-2 fontMedium">
              지금까지 등록된 과제 <span className="fontBold text-blue-600">{totalTasks}개</span>
            </span>
          </div>
          <table className="min-w-full bg-white border-t border-[black]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">번호</th>
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">아기사자</th>
                <th className="px-20 py-2 bg-[#f7f7f7]"></th> {/* 공백을 위한 빈 <td> */}
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">오늘의 과제</th>
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">진행중인 과제</th>
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">통과된 과제</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  className="text-center border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNameClick(assignment)}>
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">{assignment.name}</td>
                  <td className="px-20 py-2 text-sm"></td> {/* 공백을 위한 빈 <td> */}
                  <td
                    className={`px-4 py-2 text-sm ${
                      assignment.todayTask.startsWith('0') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                    {assignment.todayTask}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${
                      assignment.ongoingTask.startsWith('0') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                    {assignment.ongoingTask}
                  </td>
                  <td className="px-4 py-2 text-sm">{assignment.completedTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default IndividualManagement;
