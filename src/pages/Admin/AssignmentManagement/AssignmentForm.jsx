import React, { useState } from 'react';
import axios from 'axios';

const AssignmentForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      // 서버로 데이터를 보내는 POST 요청
      const response = await axios.post('/api/assignments', {
        title,
        description,
      });

      if (response.status === 201) {
        alert('등록되었습니다.');
        onSubmit(); // 등록 성공 시 부모 컴포넌트의 onSubmit 함수 호출
      } else {
        alert('등록에 실패하였습니다.');
      }
    } catch (error) {
      alert('등록에 실패하였습니다.');
    }
  };

  return (
    <div className="mt-8 w-full px-16 max-w-4xl mx-auto">
      {' '}
      {/* 중앙에 배치하고 너비를 4xl로 확장 */}
      <div className="text-xl fontBold mb-6">오늘의 과제 관리</div>
      <div className="space-y-6">
        <div className="flex items-center">
          <label className="block text-sm fontSB w-16">제목</label> {/* 레이블 너비 고정 */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 h-8 block flex-1 border border-gray-400 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-start">
          <label className="block text-sm fontSB w-16 pt-2">설명</label> {/* 레이블 너비 고정 */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 h-52 block flex-1 border border-gray-400 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="6"></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border border-gray-400 text-xs rounded-md hover:bg-gray-300 fontRegular"
            onClick={handleSubmit}>
            등록
          </button>
          <button
            className="px-4 py-2 border border-gray-400 text-xs rounded-md hover:bg-gray-300 fontRegular"
            onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;
