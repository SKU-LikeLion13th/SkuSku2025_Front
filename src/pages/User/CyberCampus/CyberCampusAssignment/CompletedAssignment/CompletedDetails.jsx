import React, { useEffect, useState } from 'react';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useParams } from 'react-router-dom';
import API from '../../../../../utils/axios';

export default function CompletedDetails() {
  const { track, assignmentId } = useParams(); // assignmentId를 URL에서 추출
  const [assignmentDetails, setAssignmentDetails] = useState({});

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const writerName = userInfo?.name || 'Unknown';

        const response = await API.get('/submit/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            writer: writerName,
            track: track
              .replace('PM&DESIGN', 'PM_DESIGN')
              .replace('BACK-END', 'BACKEND')
              .replace('FRONT-END', 'FRONTEND'),
          },
        });

        // 응답 데이터에서 done 상태의 과제 중에서 assignmentId와 일치하는 과제를 찾음
        const assignments = response.data.done || [];
        const assignment = assignments.find(item => item.assignmentId === parseInt(assignmentId, 10));

        if (assignment) {
          const submitDetails = assignment.submitAssignmentWithoutDTO;
          setAssignmentDetails({
            ...assignment,
            isPassed: submitDetails?.passNonePass === 'PASS',
          });
        } else {
          console.error('해당 과제를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('과제 세부 정보를 가져오는 중 오류 발생:', error.response || error.message || error);
      }
    };

    fetchAssignmentDetails();
  }, [track, assignmentId]);

  const formatDueDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 통과 여부에 따라 멘트와 색상 조절
  const passStatus = assignmentDetails.isPassed ? '통과' : '통과 안됨';
  const passStatusStyle = assignmentDetails.isPassed ? { color: 'green' } : { color: 'red' };

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제 제출</div>
      </div>
      <CyberCampusLocation />
      <div className="w-3/5 mx-auto">
        <div className="flex justify-between pb-6 mt-12 fontBold">
          <div className="flex text-2xl fontBold">
            {assignmentDetails.title}
          </div>
          <div className="flex items-center">
            <div>{formatDueDate(assignmentDetails.dueDate)} 마감</div>
          </div>
        </div>  
        <div className="pb-4 mb-6 text-xl border-b-2 border-black fontBold">
          [{assignmentDetails.subTitle}]
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="mr-3 text-xl fontBold whitespace-nowrap">제출 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1">제출 완료</div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold whitespace-nowrap">통과 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-6 py-1" style={passStatusStyle}>
              {passStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
