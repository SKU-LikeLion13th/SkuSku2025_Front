import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import Project_Tabs from './Project_Tabs';
import API from '../../../utils/axios';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tabs, setTabs] = useState([]);

  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // URL 쿼리(tab) 변화 반영
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab) setActiveTab("all");
    else setActiveTab(tab);
  }, [searchParams]);

  // 프로젝트 불러오기 (S3 URL 사용)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/project/all");
        setProjects(data);

        // 탭 목록 생성 (예: ["13","12","11"])
        const classList = [...new Set(data.map((p) => p.classTh))]
          .filter(Boolean)
          .sort()
          .reverse();
        setTabs(classList);
      } catch (error) {
        console.error("프로젝트를 가져오는 중 오류 발생:", error);
      }
    };
    fetchProjects();
  }, []);

  // 탭 변화에 따라 필터링
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => String(p.classTh) === String(activeTab)));
    }
  }, [activeTab, projects]);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    if (tabValue === "all") setFilteredProjects(projects);
    else setFilteredProjects(projects.filter((p) => String(p.classTh) === String(tabValue)));
  };

  const openProject = (url) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen mx-auto lg:container lg:px-5 lg:mb-24">
      <div className="w-10/12 mx-auto pt-28">
        <div className="pb-4 mx-auto text-6xl text-center fontEB md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div className="text-white">PROJECT</div>
          <div className="mt-3 text-white text-base md:text-lg">
            총 <span className="text-[#3B79FF] font-bold">{filteredProjects.length}건</span>의 프로젝트가 있습니다.
          </div>
        </div>
        <Project_Tabs activeTab={activeTab} onTabClick={handleTabClick} tabs={tabs} />

        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="w-10/12 mx-auto cursor-pointer md:w-full hover:textShadow duration-500 hover:-translate-y-1 group"
              onClick={() => openProject(project.projectUrl)}
            >
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-[17/10] rounded-[20px] shadow-lg object-cover group-hover:opacity-30 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg fontBold">
                    사이트 보러가기
                  </span>
                </div>
              </div>
              <div className="p-2">
                <div className="my-1 text-sm xl:my-2 fontBold min-[500px]:text-lg lg:text-xl xl:text-2xl">
                  {project.title}
                </div>
                <div className="text-xs sm:text-sm xl:text-lg text-[#A2A2A2]">
                  {project.subTitle}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-[#A2A2A2] py-10">
              해당 탭에 프로젝트가 없어요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}