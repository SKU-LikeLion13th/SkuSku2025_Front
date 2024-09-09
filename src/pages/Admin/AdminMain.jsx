import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMain = () => {
  const navigate = useNavigate();

  const trackData = [
    {
      title: "강의자료",
      subtitle: "세션 강의자료 관리",
      bgColor: "bg-gradient-to-r from-[#FFE3CF] to-[#FF8C3A]",
      navigateTo: `/admin/main/lectureManagementMain`,
    },
    {
      title: "과제제출",
      subtitle: "아기사자 과제 관리",
      bgColor: "bg-gradient-to-r from-[#BDFFFF] to-[#47EAEA]",
      navigateTo: `/admin/main/assignmentIntro`,
    },
    {
      title: "프로젝트",
      subtitle: "기수별 프로젝트 관리",
      bgColor: "bg-gradient-to-r from-[#FFD1E2] to-[#FF87B1]",
      navigateTo: `/admin/main/projectManagement`,
    },
  ];

  return (
    <div className="container flex flex-col mx-auto text-center">
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">관리자페이지</div>
      </div>

      <div className="flex justify-center mx-auto text-[28px] fontBold flex-wrap mt-28 mb-10">
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

export default AdminMain;
