import React, { useState } from 'react';

const AssignmentInformation = ({ assignments, onAddClick, onDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // 선택된 과제를 저장할 상태
  const itemsPerPage = 4;

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

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setSelectedAssignment(null);
  };

  return (
    <div className="mt-20 w-full px-8">
      <div className="text-2xl fontBold mb-8">오늘의 과제 관리</div>
      <div className="grid grid-cols-2 gap-12">
        {/* 서버에서 받은 데이터를 렌더링 */}
        {currentItems.map(assignment => (
          <div
            key={assignment.id}
            className="p-7 bg-blue-500 text-white rounded-lg shadow-lg h-36 truncate cursor-pointer"
            onClick={() => setSelectedAssignment(assignment)} // 클릭 시 전체 내용을 볼 수 있게 설정
          >
            <div className="fontEB text-lg mb-3">
              {assignment.title} {assignment.subTitle && `[${assignment.subTitle}]`}
            </div>
            <p className="text-sm truncate overflow-hidden text-ellipsis">{assignment.description}</p>
            <p className="text-sm mt-4">{formatDueDate(assignment.dueDate)}</p>
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

      {/* 모달 */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="p-7 bg-blue-500 text-white rounded-lg shadow-lg w-96">
            {' '}
            {/* 모달 스타일을 동일하게 설정 */}
            <div className="fontEB text-lg mb-3">
              {selectedAssignment.title} {selectedAssignment.subTitle && `[${selectedAssignment.subTitle}]`}
            </div>
            <p className="text-sm">{selectedAssignment.description}</p>
            <p className="text-sm mt-4">{formatDueDate(selectedAssignment.dueDate)}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 fontRegular text-black text-xs rounded-lg hover:bg-gray-300"
                onClick={handleCloseModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentInformation;
