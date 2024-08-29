import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Project_Tabs from '../../../../User/Project/Project_Tabs';
import API from '../../../../../utils/axios';

export default function UpdateProject() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = JSON.parse(localStorage.getItem('token')); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }

      try {
        const response = await API.get('/project/all', {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
          },
        });
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('프로젝트를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleTabClick = tabValue => {
    if (tabValue === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.classTh === tabValue));
    }
  };

  const handleEditClick = projectId => {
    navigate(`/admin/projectManagement/updateProject/${projectId}`);
  };

  return (
    <div className="min-h-screen mx-auto md:container md:px-5">
      <div className="w-10/12 mx-auto md:mt-28">
        <div className="pb-4 mx-auto text-6xl text-center fontEB md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div className="text-black">PROJECT</div>
        </div>
        <div className="mt-8 text-4xl fontEB">
          프로젝트 <span className="text-[#3B79FF]">수정</span>
        </div>
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-black md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="relative w-10/12 mx-auto cursor-pointer md:w-full group hover:textShadow duration-500 hover:translate-y-[-5px] ">
              <div className="relative">
                <img
                  src={`data:image/png;base64,${project.image}`}
                  alt={project.title}
                  className="w-full rounded-[20px] shadow-lg transition-opacity duration-500 group-hover:opacity-50 "
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <button
                    className="px-6 py-2 text-lg text-white bg-blue-500 rounded-lg fontBold "
                    onClick={e => {
                      e.stopPropagation();
                      handleEditClick(project.id); // 수정 페이지로 이동
                    }}>
                    수정하기
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
    </div>
  );
}
