import React from "react";
import { images } from "../../../utils/images";
import "../../../css/track.css";

const Pm_Design = () => {
  return (
    <>
      <div className="container flex justify-center w-10/12 mx-auto part partPm pt-20 lg:mb-[15rem] mobileContainer lg:min-h-screen">
        <div className="partContent">
          <div className="pt-10">
            <span className="text-[#FF669D] fontEB  text-6xl">DESIGN</span>
            <br />
            <span className="text-[#FFBFD6] fontSB text-6xl">CURRICULUM</span>
          </div>

          <div className="py-24 @lg:py-32 @container">
            <ul className="flex justify-between @lg:w-[512px] mb-2 curriUl">
              <li className="w-[90px] text-center fontThin text-base @lg:text-lg whitespace-nowrap">
                PM의 정의
              </li>
              <li className="w-[90px] text-center fontThin text-base @lg:text-lg whitespace-nowrap">
                프로젝트 협업
              </li>
              <li className="w-[90px] text-center fontThin text-base @lg:text-lg whitespace-nowrap">
                UI UX 디자인
              </li>
              <li className="w-[90px] text-center fontThin text-base @lg:text-lg whitespace-nowrap">
                피그마 교육
              </li>
            </ul>
            <img
              src={images.track_pm_curri}
              alt="track_pm_curri"
              className="w-[512px] curriImg"
            />
          </div>

          <div className="text-lg leading-8 fontEL whitespace-nowrap">
            <span className="text-2xl fontBold">UX/UI 디자이너</span>는<br />
            제품 또는 서비스의 사용자 경험을 개선하기 위해
            <br />
            사용자 연구, 프로토타입 제작, 디자인 시스템 구축 등을 수행하며,
            <br />
            직관적이고 효과적인 사용자 인터페이스(UI)를 설계하고 구현합니다.
            <br />
          </div>
        </div>
        <div className="w-1/2 rightBox"></div>
      </div>
    </>
  );
};

export default Pm_Design;
