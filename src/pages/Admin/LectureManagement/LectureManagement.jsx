import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LectureBoard from '../../../components/LectureBoard';
import LectureContent from '../../../components/LectureContent';
import AddLecture from './AddLecture';
import EditLecture from './EditLecture'; // Import the EditLecture component

const LectureManagement = () => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingLecture, setAddingLecture] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null); 
  const isAdmin = true;

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://back.sku-sku.com/lecture/all', {
        params: { track: 'FRONTEND' },
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
  }, []);

  const handleLectureSelect = async (lecture) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://back.sku-sku.com/lecture`, {
        params: { id: lecture.id },
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
    setAddingLecture(false);
    setEditingLecture(null); 
  };

  const handleAddLecture = () => {
    setAddingLecture(true);
    setSelectedLecture(null);  
    setEditingLecture(null);   
  };

  const handleEditLecture = (lecture) => {
    setEditingLecture(lecture);
    setSelectedLecture(null);  
    setAddingLecture(false);   
  };

  const handleBackToLectureContent = (lecture) => {
    setEditingLecture(null);
    setAddingLecture(false);
    setSelectedLecture(lecture);
  };

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
        {editingLecture ? (
          <EditLecture lecture={editingLecture} onBack={() => handleBackToLectureContent(editingLecture)} />
        ) : addingLecture ? (
          <AddLecture onBack={handleBackToBoard} />
        ) : selectedLecture ? (
          <LectureContent
            lecture={selectedLecture}
            onBack={handleBackToBoard}
            onEdit={handleEditLecture} 
            isAdmin={isAdmin}
            refreshLectures={fetchLectures}  // Pass the fetchLectures function as a prop
          />
        ) : (
          <LectureBoard
            lectures={lectures}
            onSelectLecture={handleLectureSelect}
            isAdmin={isAdmin}
            onAddLecture={handleAddLecture}
          />
        )}
      </div>
    </div>
  );
};

export default LectureManagement;

