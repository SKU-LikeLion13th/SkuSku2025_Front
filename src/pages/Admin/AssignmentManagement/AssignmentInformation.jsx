import React, { useState } from 'react';
import '../../../css/scrollbar.css'; // Custom CSS 파일을 임포트

const AssignmentInformation = ({ assignments, onAddClick, onDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 보여줄 과제 수

  // 현재 페이지에 해당하는 과제들만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assignments.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(assignments.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handleClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // 날짜 포맷 변환 함수
  const formatDueDate = duedate => {
    const date = new Date(duedate);
    return `마감일 : ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="mt-20 w-full px-8">
      <div className="text-2xl fontBold mb-8">오늘의 과제 관리</div>
      <div className="grid grid-cols-2 gap-12">
        {/* 서버에서 받은 데이터를 렌더링 */}
        {currentItems.map(assignment => (
          <div key={assignment.id} className="p-6 bg-blue-500 text-white rounded-lg shadow-lg h-32">
            <div className="fontEB text-lg mb-2">
              {assignment.title} {assignment.subTitle && `[${assignment.subTitle}]`}
            </div>
            <p className="text-sm">{assignment.description}</p>
            <p className="text-sm mt-2">{formatDueDate(assignment.dueDate)}</p> {/* 마감일 추가 */}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-3">
        {/* 페이지네이션 버튼 */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100 ${
              currentPage === index + 1 ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-4 space-x-3">
        <button
          className="px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100"
          onClick={onAddClick}>
          추가
        </button>
        <button
          className="px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100"
          onClick={onDeleteClick}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default AssignmentInformation;
