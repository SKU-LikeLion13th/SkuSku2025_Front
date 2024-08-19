import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LectureBoard from '../../../../components/LectureBoard';
import LectureContent from '../../../../components/LectureContent';

const CyberCampusLecture = () => {
  const { track } = useParams(); 
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = false;

  const formatTrackName = (track) => {
    console.log(track)
    if (track === 'PM/DESIGN') {
      return 'PM_DESIGN';
    }
    return track.toUpperCase().replace('-', '');
  };

  const formattedTrack = formatTrackName(track);

  const handleLectureSelect = async (lecture) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://back.sku-sku.com/lecture`, {
        params: { id: lecture.id } 
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
          params: { track: formattedTrack } 
        });
        setLectures(response.data);
        console.log(response.data);
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

    fetchLectures();
  }, [formattedTrack]); 

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
          <p className="text-[#3B79FF] ml-1">{track}</p>
          <p>강의자료</p>
        </div>
        <div>경로</div>
        {selectedLecture ? (
          <LectureContent lecture={selectedLecture} onBack={handleBackToBoard} />
        ) : (
          <LectureBoard lectures={lectures} onSelectLecture={handleLectureSelect} isAdmin={isAdmin} />
        )}
      </div>
    </div>
  );
};

export default CyberCampusLecture;
