import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LectureBoard from '../../../../components/LectureBoard';
import LectureContent from '../../../../components/LectureContent';
import CyberCampusLocation from './../../../../components/CyberCampusLocation';

const CyberCampusLecture = () => {
  const { track } = useParams();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = false;

  // Format track name based on specific cases
  const formatTrackName = (track) => {
    if (track === 'PM&DESIGN') {
      return 'PM_DESIGN';
    }
    return track.toUpperCase().replace('-', '');
  };

  const formattedTrack = formatTrackName(track);

  // Function to handle selecting a lecture
  const handleLectureSelect = async (lecture) => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      setLoading(true);
      const response = await axios.get(`https://back.sku-sku.com/lecture`, {
        params: { id: lecture.id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedLecture(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBoard = () => {
    setSelectedLecture(null);
    fetchLectures();
  };

  const fetchLectures = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      setLoading(true);
      const response = await axios.get('https://back.sku-sku.com/lecture/all', {
        params: { track: formattedTrack },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLectures(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setLectures([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []); // 빈 배열로 두어 컴포넌트 마운트 시 한 번만 실행되도록 설정

  if (loading) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-32 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto w-full">
      <div className='w-full h-full flex flex-col items-center'>
        <div className="flex flex-col items-center justify-center pt-40 fontEB">
          <div className="text-[#3B79FF] my-2 ml-1 text-7xl">{track}</div>
          <div className="mr-1 text-6xl">과제제출</div>
        </div>
        <CyberCampusLocation />
        {selectedLecture ? (
          <LectureContent lecture={selectedLecture} onBack={handleBackToBoard} refreshLectures={fetchLectures} />
        ) : (
          <LectureBoard
            lectures={lectures}
            onSelectLecture={handleLectureSelect}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default CyberCampusLecture;
