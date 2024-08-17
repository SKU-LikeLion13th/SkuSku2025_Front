import React from 'react';
import { images } from '../utils/images';

const LectureContent = ({ lecture, onBack }) => {
  const handleBackClick = () => {
    onBack();
    window.location.reload();
  };

  // 파일 다운로드를 처리하는 함수
  const handleDownload = (file) => {
    const link = document.createElement('a');
    const blob = new Blob([new Uint8Array(atob(file.file).split('').map((char) => char.charCodeAt(0)))], {
      type: file.fileType,
    });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = file.fileName;
    link.click();
    URL.revokeObjectURL(url); // 메모리 누수를 방지하기 위해 URL 해제
  };

  // 첫 번째 첨부파일을 가져옴 (여러 파일이 있을 경우 확장 가능)
  const firstFile = lecture.joinLectureFiles && lecture.joinLectureFiles[0];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fontLight">
      <div className="w-3/4 mt-10 text-center">
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
