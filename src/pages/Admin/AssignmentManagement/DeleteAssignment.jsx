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
        let token = localStorage.getItem('token');

        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        // 서버로 전체 삭제 요청을 보냄
        await axios.delete('https://back.sku-sku.com/admin/assignment/deleteAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onDeleteAll(); // 서버 삭제 후 로컬 상태 업데이트
        alert('삭제되었습니다!'); // 삭제 성공 알림
      } catch (error) {
        console.error('전체 삭제 실패:', error);
        alert('전체 삭제에 실패하였습니다.');
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedAssignments.length === 0) {
      alert('삭제할 과제를 선택해주세요.');
      return;
    }

    try {
      let token = localStorage.getItem('token');

      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      // 선택된 과제들에 대해 서버로 삭제 요청을 보냄 (쿼리 파라미터로 ID 포함)
      await Promise.all(
        selectedAssignments.map(id =>
          axios.delete('https://back.sku-sku.com/admin/assignment', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { id }, // 쿼리 파라미터로 ID 전송
          }),
        ),
      );

      onDeleteSelected(); // 서버 삭제 후 로컬 상태 업데이트
      alert('삭제되었습니다!'); // 삭제 성공 알림
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
              selectedAssignments.includes(assignment.id) ? 'border-4 border-gray-600' : ''
            }`}>
            <div>
              <div className="fontEB text-lg mb-2">{assignment.title}</div>
              <p className="text-sm">{assignment.description}</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="w-6 h-6 rounded-full"
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
