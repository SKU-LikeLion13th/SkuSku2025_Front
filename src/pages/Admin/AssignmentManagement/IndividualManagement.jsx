import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentTitle from '../../../components/AssignmentTitle';
import AssignmentDetail from './AssignmentDetail';

const IndividualManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        const response = await axios.get('https://back.sku-sku.com/admin/submit/trackcnt', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: 'FRONTEND',
          },
        });

        // 서버에서 받은 데이터를 파싱하여 필요한 정보로 변환
        const { totalAssignmentsByTrack, assignmentCounts } = response.data;

        const fetchedData = assignmentCounts.map((item, index) => ({
          id: index + 1, // 임의의 ID 부여
          name: item.writer,
          todayTask: `${item.submittedTodayCount}/${item.todayCount}`, // 제출된 오늘의 과제 수 / 총 오늘의 과제 수
          ongoingTask: `${item.submittedIngCount}/${item.ingCount}`, // 제출된 진행중인 과제 수 / 총 진행중인 과제 수
          completedTask: item.doneCount, // 통과된 과제 수
          tasks: [], // 실제 과제 데이터는 없는 상태
          ongoingTasks: [], // 실제 진행 중인 과제 데이터는 없는 상태
        }));

        setAssignments(fetchedData);
        setTotalTasks(totalAssignmentsByTrack); // 총 과제 수 설정
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
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
                  <td className="px-4 py-2 text-sm fontBold">{index + 1}</td>
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
