import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import LectureBoard from '../../../../components/LectureBoard';
import LectureContent from '../../../../components/LectureContent';
import CyberCampusLocation from './../../../../components/CyberCampusLocation';
import API from '../../../../utils/axios';

const CyberCampusLecture = () => {
  const { track, lectureId } = useParams(); // URL의 track과 lectureId 가져오기
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedLecture, setSelectedLecture] = useState(null); // 선택된 강의
  const [lectures, setLectures] = useState([]); // 강의 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const isAdmin = false;

  const formatTrackName = track => {
    if (track === 'DESIGN') {
      return 'PM_DESIGN';
    }
    return track.toUpperCase().replace('-', '');
  };

  const formattedTrack = formatTrackName(track);

  // 강의 선택 시 실행되는 함수
  const handleLectureSelect = async lecture => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      setLoading(true);
      const response = await API.get(`/lecture`, {
        params: { id: lecture.id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedLecture(response.data);
      navigate(`/cyberCampus/intro/${track}/lecture/${lecture.id}`); // URL 업데이트
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 강의 목록을 불러오는 함수
  const fetchLectures = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      setLoading(true);
      const response = await API.get('/lecture/all', {
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

  // lectureId로 강의를 불러오는 함수 (새로고침 대응)
  const fetchLectureById = async (id) => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      setLoading(true);
      const response = await API.get(`/lecture`, {
        params: { id: id },
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

  // 컴포넌트가 마운트될 때 강의 목록을 가져옴
  useEffect(() => {
    fetchLectures();
  }, []);

  // URL에 lectureId가 있는 경우에만 해당 강의를 불러옴
  useEffect(() => {
    if (lectureId && !selectedLecture) {
      fetchLectureById(lectureId);
    }
  }, [lectureId, selectedLecture]);

  if (loading || (lectureId && !selectedLecture)) {
    return <div className="mt-32 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-32 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container w-full mx-auto ">
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center justify-center pt-40 fontEB">
          <div className="text-[#3B79FF] my-2 ml-1 text-7xl">{track}</div>
          <div className="mr-1 text-6xl">강의자료</div>
        </div>
        <CyberCampusLocation />
        {/* lectureId가 있으면 LectureContent, 없으면 LectureBoard 표시 */}
        {lectureId && selectedLecture ? (
          <LectureContent
            lecture={selectedLecture}
            onBack={() => {
              setSelectedLecture(null);
              navigate(`/cyberCampus/intro/${track}/lecture`);
            }}
            refreshLectures={fetchLectures}
          />
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
