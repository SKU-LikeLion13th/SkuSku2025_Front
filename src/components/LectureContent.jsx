import axios from 'axios';
import React from 'react';
import { images } from '../utils/images';

const LectureContent = ({ lecture, onBack, onEdit, isAdmin, refreshLectures }) => {
  const handleBackClick = () => {
    onBack();
  };

  const handleEditClick = () => {
    onEdit(lecture);
    console.log('버튼 눌림', lecture);
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    const blob = new Blob([new Uint8Array(atob(file.file).split('').map((char) => char.charCodeAt(0)))], {
      type: file.fileType,
    });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = file.fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 강의 삭제
  const handleDeleteSelected = async () => {
    console.log(lecture.id); 
    let token = localStorage.getItem('token');
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1); 
    }
    const confirmDelete = window.confirm("해당 강의를 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      const url = `https://back.sku-sku.com/admin/lecture/delete?lectureId=${lecture.id}`;
      
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Lecture deleted:', response.data);
      
      refreshLectures(); 
      onBack();  
    } catch (error) {
      console.error('Failed to delete lecture:', error.response ? error.response.data : error.message);
      alert('강의 자료 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };
  

  const firstFile = lecture.joinLectureFiles && lecture.joinLectureFiles[0];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fontLight">
      <div className="w-3/4 mt-10 text-center">
        {isAdmin && (
          <div className="mb-3 w-full flex justify-end">
            <button className="text-[#868686] border-2 mr-2 py-1 px-3 rounded-md" onClick={handleEditClick}>
              수정
            </button>
            <button className="text-[#868686] border-2 mr-2 py-1 px-3 rounded-md" onClick={handleDeleteSelected}>삭제</button>
          </div>
        )}
        <div className="h-[1.5px] w-full bg-black" />
        <div className="flex flex-col justify-evenly items-center text-center w-1/2 min-h-80 mx-auto bg-[#F7F7F7] rounded-lg mt-24 py-5">
          <div className="text-4xl fontBold">{lecture.title}</div>
          <div className="text-center text-sm text-[#808080]">
            <span className="fontSB">작성자 :</span> {lecture.writer}
            <span className="fontSB ml-10">작성일 :</span> {lecture.createDate}
            <span className="fontSB ml-10">조회수 :</span> {lecture.views}
          </div>
          <div className="h-[1.5px] w-2/3 bg-black mx-auto" />
          {firstFile && (
            <button
              className="flex items-center justify-center w-1/2 h-10 border-2 rounded-lg text-[#3B79FF] fontSB"
              onClick={() => handleDownload(firstFile)}
            >
              <img src={images.attach} className="w-5 mr-3" alt="첨부파일 아이콘" />
              첨부파일 - {firstFile.fileName}
            </button>
          )}
        </div>
        <button
          onClick={handleBackClick}
          className="border py-[2px] px-6 rounded-lg border-[#9A9A9A] mb-12 mt-12"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default LectureContent;
