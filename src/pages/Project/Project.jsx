import React, { useEffect, useState } from 'react';
import Project_Tabs from './Project_Tabs';
import axios from 'axios';
/* import { AiOutlineDelete } from 'react-icons/ai'; */

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  /* 프로젝트 추가 코드 */
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://back.sku-sku.com/project/all', {
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

  /* 프로젝트 삭제 코드 */
  const handleDelete = async projectId => {
    try {
      await axios.delete(`http://back.sku-sku.com/project/${projectId}`, {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // 토큰 수정 필요
        },
      });
      // 상태에서 삭제된 프로젝트 제거
      setProjects(projects.filter(project => project.id !== projectId));
      setFilteredProjects(filteredProjects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('프로젝트 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div className="min-h-screen mx-auto md:container md:px-5">
      <div className="w-10/12 mx-auto md:mt-28">
        <div className="pb-4 mx-auto text-6xl text-center fontEB md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div className="text-white">PROJECT</div>
        </div>
        {/* 프로젝트 추가 코드 */}
        {/* <div className="flex items-center justify-between w-fit">
            <button className="px-6 py-2 bg-blue-500 rounded-lg h-fit">
              <a href="/createProject">프로젝트 추가</a>
            </button>
          </div> */}
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="w-10/12 mx-auto relative cursor-pointer md:w-full hover:textShadow duration-500 hover:translate-y-[-5px] "
              onClick={() => openProject(project.url)}>
              <img
                src={`data:image/png;base64,${project.image}`}
                alt={project.title}
                className="w-full rounded-[20px]"
              />
              <div className="p-2">
                <div className="my-1 text-sm xl:my-2 fontBold min-[500px]:text-lg lg:text-xl xl:text-2xl">
                  {project.title}
                </div>
                <div className="text-xs sm:text-sm xl:text-lg">{project.subTitle}</div>
              </div>
              {/* 프로젝트 삭제 버튼 */}
              {/* <button
                className="absolute text-red-500 top-2 right-2 hover:text-red-700"
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(project.id);
                }}>
                <AiOutlineDelete size={24} />
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
