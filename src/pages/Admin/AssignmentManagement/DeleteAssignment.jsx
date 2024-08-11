import React from 'react';
import axios from 'axios';

const DeleteAssignments = ({
  assignments,
  selectedAssignments,
  onSelectAssignment,
  onDeleteAll,
  onDeleteSelected,
  onCancel,
}) => {
  const handleDeleteAll = async () => {
    if (window.confirm('전체 삭제하시겠습니까?')) {
      try {
        // 서버로 전체 삭제 요청을 보냄
        await axios.delete('/api/assignments');
        onDeleteAll(); // 서버 삭제 후 로컬 상태 업데이트
      } catch (error) {
        console.error('전체 삭제 실패:', error);
        alert('전체 삭제에 실패하였습니다.');
      }
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // 선택된 과제들에 대해 서버로 삭제 요청을 보냄
      await Promise.all(selectedAssignments.map(id => axios.delete(`/api/assignments/${id}`)));
      onDeleteSelected(); // 서버 삭제 후 로컬 상태 업데이트
    } catch (error) {
      console.error('선택 삭제 실패:', error);
      alert('선택 삭제에 실패하였습니다.');
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-12">
        {assignments.map(assignment => (
          <div
            key={assignment.id}
            className={`p-6 bg-blue-500 text-white rounded-lg shadow-lg h-32 flex justify-between items-center ${
              selectedAssignments.includes(assignment.id) ? 'border-4 border-blue-800' : ''
            }`}>
            <div>
              <div className="fontEB text-lg mb-2">{assignment.title}</div>
              <p className="text-sm">{assignment.description}</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={selectedAssignments.includes(assignment.id)}
                onChange={() => onSelectAssignment(assignment.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6 space-x-3">
        <button
          className="px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100"
          onClick={handleDeleteAll}>
          전체 삭제
        </button>
        <button
          className="px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100"
          onClick={handleDeleteSelected}>
          선택 삭제
        </button>
        <button
          className="px-4 py-2 border border-[#868686] fontRegular text-xs rounded-lg hover:bg-gray-100"
          onClick={onCancel}>
          취소
        </button>
      </div>
    </>
  );
};

export default DeleteAssignments;
