import React from "react";
import { useNavigate } from "react-router-dom";

const LectureManagementMain = () => {
  const navigate = useNavigate();

  const trackData = [
    {
      title: "프론트엔드",
      subtitle: "FRONT-END",
      bgColor: "bg-gradient-to-r from-[#FFE3CF] to-[#FF8C3A]",
      navigateTo: `/admin/main/lectureManagementMain/FRONT-END`,
    },
    {
      title: "백엔드",
      subtitle: "BACK-END",
      bgColor: "bg-gradient-to-r from-[#BDFFFF] to-[#47EAEA]",
      navigateTo: "/admin/main/lectureManagementMain/BACK-END",
    },
    {
      title: "디자인",
      subtitle: "DESIGN",
      bgColor: "bg-gradient-to-r from-[#FFD1E2] to-[#FF87B1]",
      navigateTo: "/admin/main/lectureManagementMain/PM&DESIGN",
    },
  ];

  return (
    <div className="flex flex-col mx-auto container text-center">
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className="my-16">강의자료 등록 및 수정하는 페이지입니다.</div>

      <div className="flex justify-center mx-auto text-[28px] fontBold flex-wrap">
        {trackData.map((track, index) => (
          <button
            key={index}
            className={`${track.bgColor} mb-24 mx-8 w-[300px] shadow-lg py-14 px-8 rounded-xl hover:textShadow duration-500 hover:translate-y-[-5px] text-start`}
            onClick={() => navigate(track.navigateTo)}
          >
            <div className="mb-1">{track.title}</div>
            <div className="text-xs whitespace-pre-line fontRegular">
              {track.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LectureManagementMain;
