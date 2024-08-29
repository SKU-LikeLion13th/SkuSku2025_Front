import React, { useState, useEffect } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import AssignmentDetail from './AssignmentDetail';
import API from '../../../utils/axios';

const IndividualManagement = ({ trackType }) => {
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

        const response = await API.get('/admin/submit/trackcnt', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: trackType.toUpperCase(), // trackType을 동적으로 설정
          },
        });

        const { totalAssignmentsByTrack, assignmentCounts } = response.data;

        // 새로운 데이터 구조에 맞게 변환
        const fetchedData = assignmentCounts.map((item, index) => ({
          id: index + 1, // 임의의 ID 부여
          name: item.writer,
          unsubmittedCount: item.unsubmittedCount, // 제출되지 않은 과제 수
          submittedCount: item.submittedCount, // 제출된 과제 수
          passCount: item.passCount, // 통과된 과제 수
        }));

        setAssignments(fetchedData);
        setTotalTasks(totalAssignmentsByTrack); // 총 과제 수 설정
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [trackType]); // trackType이 변경될 때마다 데이터 갱신

  const handleNameClick = assignment => {
    setSelectedAssignment(assignment);
    console.log('Assignment clicked:', assignment);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      {selectedAssignment ? (
        // AssignmentDetail로 trackType을 함께 전달
        <AssignmentDetail assignment={selectedAssignment} trackType={trackType} />
      ) : (
        <>
          <div className="flex flex-col items-center mb-16">
            <AssignmentTitle variant="title" className="mb-8">
              {trackType.replace('_', ' ')} {/* trackType을 동적으로 반영 */}
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
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">미제출 과제</th>
                <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">제출된 과제</th>
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
                      assignment.unsubmittedCount > 0 ? 'text-red-600' : 'text-blue-600'
                    }`}>
                    {assignment.unsubmittedCount}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${assignment.submittedCount > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {assignment.submittedCount}
                  </td>
                  <td className="px-4 py-2 text-sm">{assignment.passCount}</td>
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
