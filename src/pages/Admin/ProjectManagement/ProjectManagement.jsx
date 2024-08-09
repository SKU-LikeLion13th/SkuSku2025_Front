import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Project_Tabs from '../../User/Project/Project_Tabs';

export default function ProjectManagement() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  /* 프로젝트 불러오기 코드 */
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://back.sku-sku.com/project/all', {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // 토큰 수정 필요
        },
      });
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('프로젝트를 가져오는 중 오류 발생:', error);
    }
  };

  const handleTabClick = tabValue => {
    if (tabValue === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.classTh === tabValue));
    }
  };

  const openProject = url => {
    window.open(url, '_blank');
  };

  const buttons = [
    { text: '프로젝트 추가', color: '#BACFFF', route: '/admin/createProject' },
    { text: '프로젝트 수정', color: '#FCBD8F', route: '/admin/updateProject' },
    { text: '프로젝트 삭제', color: '#85E1AA', route: '/admin/deleteProject' },
  ];

  return (
    <div className="relative min-h-screen text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">PROJECT</div>
        <div>관리</div>
      </div>
      <div className="flex justify-center w-10/12 mx-auto text-3xl mt-28 fontBold">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="mx-8 shadow-lg p-14 rounded-xl hover:textShadow duration-500 hover:translate-y-[-5px]"
            style={{ backgroundColor: button.color }}
            onClick={() => navigate(button.route)}>
            {button.text}
          </button>
        ))}
      </div>
      <div className="w-2/3 mx-auto md:mt-28">
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="w-10/12 mx-auto cursor-pointer md:w-full hover:textShadow duration-500 hover:translate-y-[-5px] group"
              onClick={() => openProject(project.url)}>
              <div className="relative">
                <img
                  src={`data:image/png;base64,${project.image}`}
                  alt={project.title}
                  className="w-full rounded-[20px] shadow-lg group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg fontBold">사이트 보러가기</span>
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
