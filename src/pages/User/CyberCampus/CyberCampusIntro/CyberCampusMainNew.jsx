import React from "react";
import { useNavigate } from "react-router-dom";

const CyberCampusMainNew = () => {
  const navigate = useNavigate();

  const trackData = [
    {
      title: "프론트엔드",
      subtitle: "FRONT-END",
      bgColor: "bg-gradient-to-r from-[#FFE3CF] to-[#FF8C3A]",
      navigateTo: `/cyberCampus/intro/FRONT-END`,
    },
    {
      title: "백엔드",
      subtitle: "BACK-END",
      bgColor: "bg-gradient-to-r from-[#BDFFFF] to-[#47EAEA]",
      navigateTo: "/cyberCampus/intro/BACK-END",
    },
    {
      title: "디자인",
      subtitle: "DESIGN",
      bgColor: "bg-gradient-to-r from-[#FFD1E2] to-[#FF87B1]",
      navigateTo: "/cyberCampus/intro/DESIGN",
    },
  ];

  return (
    <div className="container flex flex-col mx-auto text-center lg:mb-32 lg:min-h-screen">
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className="my-16">성결대학교 아기사자들을 위한 학습 공간입니다.</div>

      <div className="flex flex-col lg:flex-row justify-center mx-auto text-[28px] fontBold flex-wrap">
        {trackData.map((track, index) => (
          <button
            key={index}
            className={`${track.bgColor} mb-24 mx-8 w-[400px] shadow-lg py-20 px-12 rounded-xl duration-500 hover:translate-y-[-5px] text-start lg:py-16 lg:px-8 lg:w-[300px]`}
            onClick={() => navigate(track.navigateTo)}
          >
            <div className="mb-1 text-4xl lg:text-3xl">{track.title}</div>
            <div className="text-xl whitespace-pre-line lg:text-sm fontRegular">
              {track.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CyberCampusMainNew;
