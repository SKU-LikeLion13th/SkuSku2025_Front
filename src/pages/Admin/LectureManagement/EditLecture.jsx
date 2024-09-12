import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../utils/axios';

const EditLecture = ({ lecture, onBack }) => {
  const { track } = useParams();
  const [title, setTitle] = useState(lecture?.title || '');
  const [file, setFile] = useState(null);

  const formatTrackName = track => {
    if (track === 'PM&DESIGN') {
      return 'PM_DESIGN';
    }
    return track.toUpperCase().replace('-', '');
  };

  const formattedTrack = formatTrackName(track);


  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title);
    }
  }, [lecture]);

  const handleBackClick = () => {
    onBack(); // Calls the function to go back to the previous state
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('trackType', formattedTrack);
    if (file) {
      formData.append('file', file);
    }
    let token = localStorage.getItem('token');
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1); 
    }

    try {
      await API.put(`https://back.sku-sku.com/admin/lecture/update`, formData, {
        params: { id: lecture.id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('수정이 완료되었습니다.');
      window.location.reload();
      onBack(); 
    } catch (error) {
      console.error('Error updating lecture:', error);
      alert('수정에 실패했습니다.');
    }
  };

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

export default EditLecture;
