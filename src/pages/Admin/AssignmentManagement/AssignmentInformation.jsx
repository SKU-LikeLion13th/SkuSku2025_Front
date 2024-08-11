import React from 'react';

const AssignmentInformation = ({ assignments, onAddClick, onDeleteClick }) => {
  return (
    <div className="mt-20 w-full px-8">
      <div className="text-2xl fontBold mb-8">오늘의 과제 관리</div>
      <div className="grid grid-cols-2 gap-12 max-h-[10rem] overflow-y-auto">
        {/* 예시 데이터를 렌더링 */}
        {assignments.map(assignment => (
          <div key={assignment.id} className="p-6 bg-blue-500 text-white rounded-lg shadow-lg h-32">
            <div className="fontEB text-lg mb-2">{assignment.title}</div>
            <p className="text-sm">{assignment.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10 space-x-3">
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
