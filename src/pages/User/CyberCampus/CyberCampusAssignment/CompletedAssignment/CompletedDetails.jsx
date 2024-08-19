import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useParams } from 'react-router-dom';

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
      const normalizedTrack = track.replace('-', '');

      try {
        const response = await axios.get('https://back.sku-sku.com/assignment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: normalizedTrack,
            status: 'DONE', // 필요한 상태로 조정 가능
          },
        });

        // 응답 데이터에서 assignmentId와 일치하는 과제를 찾습니다.
        const assignments = response.data.assignments || [];
        const assignment = assignments.find(item => item.id === parseInt(assignmentId, 10));
        setAssignmentDetails(assignment || {});
        console.log('과제 세부 정보:', assignment || {});
      } catch (error) {
        console.error('과제 세부 정보를 가져오는 중 오류 발생:', error.response || error.message || error);
      }
    };

    fetchAssignmentDetails();
  }, [track, assignmentId]);

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제 제출</div>
      </div>
      <CyberCampusLocation />
      <div className="w-3/5 mx-auto">
        <div className="pb-6 mt-12 mb-6 text-2xl border-b-2 border-black fontBold">
          {assignmentDetails.title}[{assignmentDetails.subTitle}]
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="mr-3 text-xl fontBold">제출 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1">제출 완료</div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold">통과 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-6 py-1 text-[#00B94A]">
              {assignmentDetails.isPassed ? '통과' : '통과하지 않음'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
