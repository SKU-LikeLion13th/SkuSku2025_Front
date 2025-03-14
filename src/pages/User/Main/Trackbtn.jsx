import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../utils/images";

const TrackItem = ({
  title,
  subtitle,
  bgColor,
  hoverBgColor,
  hoverContent,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(navigateTo)}
        className={`relative group flex flex-col justify-between mx-auto w-[85%] min-[1021px]:w-1/2 xl:w-full h-[14rem] text-white rounded-md ${bgColor} transition-colors duration-300`}
      >
        <div className="flex justify-between w-full h-full">
          <div className="pb-5 pl-8 text-start mr-5">
            <div className="group-hover:hidden">
              <p className="pt-16 text-4xl fontBold">{title}</p>
              <p className="text-4xl fontBold">{subtitle}</p>
            </div>
            <div
              className={`hidden group-hover:block absolute inset-0 p-8 rounded-md ${hoverBgColor}`}
            >
              {hoverContent}
            </div>
          </div>
          <div className="flex items-end justify-end h-full ml-5">
            <img
              src={images.arrowM}
              alt="화살표"
              className="h-[14%] mb-6 mr-5 z-[1] group-hover:hidden"
            />
            <img
              src={images.arrowB}
              alt="화살표"
              className="h-[14%] mb-6 mr-5 z-[1] hidden group-hover:block"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

const Trackbtn = () => {
  const trackData = [
    {
      title: "프론트엔드",
      subtitle: "FRONT-END",
      bgColor: "bg-[#666666]",
      hoverBgColor: "bg-[#EE7117]",
      hoverContent: (
        <div className="text-[#232323]">
          <div className="pb-3">
            <p className="text-3xl fontBold">프론트엔드</p>
            <p className="text-3xl fontBold">FRONT-END</p>
          </div>
          <div className="">
            <p className="text-[16px] fontRegular">웹사이트의 얼굴</p>
            <p className="text-[16px] fontRegular">
              사용자가 시각적으로
              <br />볼 수 있는 영역을 담당합니다.
            </p>
          </div>
        </div>
      ),
      navigateTo: "/frontend",
    },
    {
      title: "백엔드",
      subtitle: "BACK-END",
      bgColor: "bg-[#666666]",
      hoverBgColor: "bg-[#40ACBB]",
      hoverContent: (
        <div className="text-[#232323]">
          <div className="pb-5">
            <p className="text-3xl fontBold">백엔드</p>
            <p className="text-3xl fontBold">BACK-END</p>
          </div>
          <div className="">
            <p className="text-[16px] fontRegular">웹사이트의 두뇌</p>
            <p className="text-text-[16px] fontRegular">
              서버 및 데이터 처리 영역을 담당합니다.
            </p>
          </div>
        </div>
      ),
      navigateTo: "/backend",
    },
    {
      title: "디자인",
      subtitle: "DESIGN",
      bgColor: "bg-[#666666]",
      hoverBgColor: "bg-[#FF6F91]",
      hoverContent: (
        <div className="text-[#232323]">
          <div className="pb-3">
            <p className="text-3xl fontBold">디자인</p>
            <p className="text-3xl fontBold">DESIGN</p>
          </div>
          <div className="">
            <p className="text-[16px] fontRegular">
              웹사이트의 첫 걸음, 프로젝트 총괄
            </p>
            <p className="text-[16px] fontRegular">
              및 웹/앱 서비스 화면 디자인 영역을
              <br />
              담당합니다.
            </p>
          </div>
        </div>
      ),
      navigateTo: "/pm_design",
    },
  ];

  return (
    <div className="container mx-auto xl:w-full xl:px-0">
      <div className="grid w-[90%] max-[1535px]:w-full grid-cols-1 gap-8 xl:grid-cols-3 mt-7 mx-auto">
        {trackData.map((track, index) => (
          <TrackItem
            key={index}
            title={track.title}
            subtitle={track.subtitle}
            bgColor={track.bgColor}
            hoverBgColor={track.hoverBgColor}
            hoverContent={track.hoverContent}
            navigateTo={track.navigateTo}
          />
        ))}
      </div>
    </div>
  );
};

export default Trackbtn;
