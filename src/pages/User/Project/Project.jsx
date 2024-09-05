import React, { useEffect, useState } from 'react';
import Project_Tabs from './Project_Tabs';
import API from '../../../utils/axios';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  /* 프로젝트 불러오기 코드 */
  const fetchProjects = async () => {
    try {
      const response = await API.get('/project/all');
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

  return (
    <div className="min-h-screen mx-auto lg:container lg:px-5 lg:mb-24">
      <div className="w-10/12 mx-auto pt-28">
        <div className="pb-4 mx-auto text-6xl text-center fontEB md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div className="text-white">PROJECT</div>
        </div>
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
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
};

export default Project;
