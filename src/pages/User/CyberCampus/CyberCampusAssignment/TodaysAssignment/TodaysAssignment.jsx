import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useNavigate, useParams } from 'react-router-dom';

export default function TodaysAssignment() {
  const { track } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 4;

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }

      const normalizedTrack = track.replace('-', '');

      try {
        const response = await axios.get('https://back.sku-sku.com/assignment', {
          params: {
            track: normalizedTrack,
            status: 'TODAY',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAssignments(response.data.assignments);
      } catch (error) {
        console.error('과제를 불러오는데 실패했습니다.', error);
      }
    };

    fetchAssignments();
  }, [track]);

  // 현재 페이지에 보여줄 과제 계산
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
  const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

  const goDetail = assignment => {
    navigate(`/cyberCampus/intro/${track}/assignment/todaysAssignment/todaysDetail/${assignment.id}`, {
      state: {
        title: assignment.title,
        subTitle: assignment.subTitle,
        description: assignment.description,
      },
    });
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제제출</div>
      </div>
      <CyberCampusLocation />
      <div className="text-center mt-16 pt-16 pb-20 bg-[#F6F6F6]">
        <div className="mb-4 text-xl fontBold">
          오늘의 과제 <span className="text-blue-500">총 {assignments.length}건</span>이 있습니다.
        </div>
        <div className="text-sm">
          지난 과제는 <span className="text-blue-500 fontBold">과제 제출 &gt; 진행중인 과제</span>에서 확인 가능합니다.
        </div>
        <div className="grid items-center justify-center w-1/2 grid-cols-2 gap-12 mx-auto mt-16">
          {currentAssignments.map(assignment => (
            <button
              key={assignment.id}
              className="w-full max-w-md px-10 py-8 text-white bg-blue-500 rounded-xl text-start"
              onClick={() => goDetail(assignment)}>
              <div className="text-lg fontBold">{assignment.title}</div>
              <div className="text-lg fontBold">[{assignment.subTitle}]</div>
              <div className="mt-4 text-sm">{assignment.description}</div>
            </button>
          ))}
        </div>
        {/* 페이지네이션 버튼 */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 px-2 py-2 ${currentPage === index + 1 ? 'text-blue-500 fontBold' : ''} `}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
