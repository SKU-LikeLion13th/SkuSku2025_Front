import React, { useState } from 'react';
import axios from 'axios';

const AddLecture = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [trackType, setTrackType] = useState('FRONTEND');

  const handleBackClick = () => {
    onBack();
    window.location.reload();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!title || !file) {
      alert('제목과 파일을 모두 입력해주세요.');
      return;
    }
  
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1); 
      }
  
      const formData = new FormData();
      formData.append('trackType', trackType);
      formData.append('title', title);
      formData.append('files', file);
  
      const response = await axios.post('https://back.sku-sku.com/admin/lecture/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Lecture added:', response.data);
      alert('강의 자료가 성공적으로 등록되었습니다.');
      handleBackClick();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Failed to add lecture:', error.response ? error.response.data : error.message);
        alert('강의 자료 등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  }
  
  
  


  return (
    <div className="w-full h-full flex flex-col items-center justify-center fontLight">
      <div className="w-3/4 mt-10 text-center">
        <div className="h-[1.5px] w-full bg-black" />
        <div className="flex flex-col justify-evenly items-center text-center w-1/2 min-h-80 mx-auto bg-[#F7F7F7] rounded-lg mt-24 py-5">
          <input
            type="text"
            placeholder="강의 자료 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl fontBold text-center bg-[#F7F7F7]"
          />
          <div className="flex flex-col items-center">
            <label className="flex items-center min-w-72 border border-gray-300 rounded-lg p-4 w-full cursor-pointer">
              <span className="text-[#3b79ff] text-lg font-semibold">파일 첨부</span>
              <div className="ml-4">
                <span className="text-gray-500 font-semibold underline">
                  {file ? file.name : '파일선택'}
                </span>
                {!file && <p className="text-gray-400">또는 여기로 파일을 끌어오세요.</p>}
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex mt-5">
            <button
              onClick={handleSubmit}
              className="border py-1 px-6 rounded-lg border-[#9A9A9A] bg-[#3B79FF] text-white mr-4"
            >
              등록
            </button>
            <button
              onClick={handleBackClick}
              className="border py-1 px-6 rounded-lg border-[#9A9A9A] text-black"
            >
              취소
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleBackClick}
        className="border py-[2px] px-6 rounded-lg border-[#9A9A9A] mb-12 mt-12"
      >
        목록
      </button>
    </div>
  );
};

export default AddLecture;
