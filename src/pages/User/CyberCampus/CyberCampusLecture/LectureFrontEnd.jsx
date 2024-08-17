import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LectureBoard from '../../../../components/LectureBoard';
import LectureContent from '../../../../components/LectureContent';

const LectureFrontEnd = () => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLectureSelect = async (lecture) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://back.sku-sku.com/lecture`, {
        params: { id: lecture.id } //선택한 강의 id 전달
      });
      setSelectedLecture(response.data); 
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBoard = () => {
    setSelectedLecture(null);
  };

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://back.sku-sku.com/lecture/all', {
          params: { track: 'FRONTEND' } // track=BACKEND로 요청 보냄
        });
        setLectures(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setLectures([]); // 404 에러 발생 시 빈 배열로 설정
        } else {
          setError(err.message); // 다른 에러 처리
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-32 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto w-full">
      <div className='w-full h-full flex flex-col items-center'>
        <div className="title text-6xl fontEB text-center mt-32">
          <p className="text-[#3B79FF]">FRONT-END</p>
          <p>강의자료</p>
        </div>
        <div>경로</div>
        {selectedLecture ? (
          <LectureContent lecture={selectedLecture} onBack={handleBackToBoard} />
        ) : (
          <LectureBoard lectures={lectures} onSelectLecture={handleLectureSelect} />
        )}
      </div>
    </div>
  );
};

export default LectureFrontEnd;
