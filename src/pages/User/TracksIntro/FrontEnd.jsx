import React from "react";
import { images } from "../../../utils/images";
import "../../../css/track.css";

const FrontEnd = () => {
  return (
    <>
      <div className="container flex justify-center w-10/12 pt-20 mx-auto lg:mb-36 part partFront mobileContainer lg:min-h-screen">
        <div className="partContent">
          <div className="pt-10">
            <span className="text-[#FF7816] fontEB text-6xl">FRONT-END</span>
            <br />
            <span className="text-[#FFD7BA] fontSB text-6xl">CURRICULUM</span>
          </div>

          <div className="py-24">
            <ul className="flex justify-between w-[426px] mb-2 curriUl">
              <li className="w-[95.6px] text-center fontThin text-xl whitespace-nowrap">
                JavaScript
              </li>
              <li className="w-[95.6px] text-center fontThin text-xl whitespace-nowrap">
                React
              </li>
              <li className="w-[95.6px] text-center fontThin text-xl whitespace-nowrap">
                TypeScript
              </li>
            </ul>
            <img
              src={images.track_frontend_curri}
              alt="front_curriculum"
              className="w-[426px] curriImg"
            />
          </div>

          <div className="text-lg leading-8 fontEL whitespace-nowrap">
            <span className="text-2xl fontBold">프론트엔드</span>는<br />
            웹 애플리케이션 또는 모바일 앱의 사용자 인터페이스를 담당하는
            부분입니다.
            <br />
            사용자가 상호작용하는 화면을 구성하고 사용자 경험을 개선합니다.
            <br />
            HTML, CSS, JavaScript를 사용하여 웹 페이지를 디자인하고 개발하며,
            <br />
            사용자의 요청과 상호작용을 처리하고 화면에 표시합니다.
            <br />
            <br />
            프론트엔드는 주로 웹 브라우저에서 실행되며,
            <br />
            사용자가 직접 보는 부분으로, 시각적인 디자인과 사용자 경험에 중점을
            둡니다.
            <br />
          </div>
        </div>

        <div className="flex justify-center w-1/2 rightBox"></div>
      </div>
    </>
  );
};

export default FrontEnd;
