import React, { useEffect, useState } from 'react';
import Project_Tabs from './Project_Tabs';
import axios from 'axios';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://back.sku-sku.com/project/all', {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // 토큰 수정 필요
        },
      });
      setProjects(response.data);
      setFilteredProjects(response.data);
      console.log(response.data);
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
    <div className="container min-h-screen">
      <div className="w-10/12 mx-auto mt-28">
        <div className="flex items-end justify-between">
          <div className="pb-12 pr-20 text-6xl border-b-2 fontEB w-fit">
            <div className="text-[#3B79FF]">SKU LIKELION</div>
            <div className="text-white">PROJECT</div>
          </div>
          <button className="px-6 py-2 bg-blue-500 rounded-lg h-fit">
            <a href="/createProject">프로젝트 추가</a>
          </button>
        </div>
        <Project_Tabs onTabClick={handleTabClick} />
        <div className="grid grid-cols-3 gap-16 mt-16 text-white">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="w-full cursor-pointer hover:textShadow duration-500 hover:translate-y-[-5px]"
              onClick={() => openProject(project.url)}>
              {/* Base64 이미지 처리 */}
              <img
                src={`data:image/png;base64,${project.image}`}
                alt={project.title}
                className="w-full h-[160px] rounded-[20px]"
                onError={e => {
                  e.target.src = 'default-image.jpg';
                  console.error(`이미지 로딩 오류: ${project.image}`);
                }}
              />
              <div className="p-2">
                <div className="my-2 text-2xl fontBold">{project.title}</div>
                <div>{project.subTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
