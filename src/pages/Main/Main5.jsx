import React from 'react';
import ProjectSlider from './slider/ProjectSlider';

const Main5 = () => {
  return (
    <>
      <div className="main5 relative w-full">
        <div className="flex flex-col justify-center items-center mx-20">
          <p className="text-7xl fontBold text-[#3B79FF]">PROJECTS</p>
          <p className="text-lg fontLight my-12">성결대학교 멋쟁이사자처럼과 함께한 프로젝트들을 소개합니다.</p>
        </div>
      </div>
      <div className="py-8 mb-52">
        <ProjectSlider />
      </div>
    </>
  );
};

export default Main5;
