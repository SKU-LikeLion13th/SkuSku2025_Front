import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Project_Tabs from '../../../User/Project/Project_Tabs';

export default function DeleteProject() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = JSON.parse(localStorage.getItem('token')); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }
      try {
        const response = await axios.get('https://back.sku-sku.com/project/all');
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('프로젝트를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async projectId => {
    const token = JSON.parse(localStorage.getItem('token')); // 로컬 스토리지에서 토큰 가져오기
    if (!token) {
      console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }
    try {
      await axios.delete('https://back.sku-sku.com/admin/project', {
        params: {
          id: projectId, // 쿼리 파라미터로 ID 전달
        },
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
        },
      });
      // 상태에서 삭제된 프로젝트 제거
      setProjects(projects.filter(project => project.id !== projectId));
      setFilteredProjects(filteredProjects.filter(project => project.id !== projectId));
      setShowConfirmPopup(false);
      alert('삭제되었습니다!');
    } catch (error) {
      console.error('프로젝트 삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleTabClick = tabValue => {
    if (tabValue === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.classTh === tabValue));
    }
  };

  const handleDeleteClick = projectId => {
    setProjectToDelete(projectId);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      handleDelete(projectToDelete);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setProjectToDelete(null);
  };

  return (
    <div className="min-h-screen mx-auto md:container md:px-5">
      <div className="w-10/12 mx-auto md:mt-28">
        <div className="pb-4 mx-auto text-6xl text-center fontEB md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div>PROJECT</div>
        </div>
        <div className="mt-8 text-4xl fontEB">
          프로젝트 <span className="text-[#3B79FF]">삭제</span>
        </div>
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-black md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="relative w-10/12 mx-auto cursor-pointer md:w-full group hover:textShadow duration-500 hover:translate-y-[-5px]">
              <div className="relative">
                <img
                  src={`data:image/png;base64,${project.image}`}
                  alt={project.title}
                  className="w-full rounded-[20px] shadow-lg transition-opacity duration-500 group-hover:opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <button
                    className="px-6 py-2 text-lg text-white bg-red-500 rounded-lg fontBold"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteClick(project.id);
                    }}>
                    삭제하기
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="my-1 text-sm xl:my-2 fontBold min-[500px]:text-lg lg:text-xl xl:text-2xl">
                  {project.title}
                </div>
                <div className="text-xs sm:text-sm xl:text-lg">{project.subTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 팝업 컴포넌트 */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50">
          <div className="px-16 py-12 bg-white rounded-lg shadow-lg">
            <div className="mb-4 text-2xl fontBold">삭제하시겠습니까?</div>
            <div className="flex justify-center space-x-8 font-bold">
              <button className="px-4 py-2 text-white bg-red-500 rounded-lg" onClick={handleConfirmDelete}>
                확인
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={handleCancelDelete}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
