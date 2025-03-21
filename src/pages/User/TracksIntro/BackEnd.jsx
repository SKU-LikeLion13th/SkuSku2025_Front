import React from "react";
import { images } from "../../../utils/images";
import "../../../css/track.css";

const BackEnd = () => {
  return (
    <>
      <div className="container flex justify-center w-10/12 pt-20 mx-auto lg:mb-36 part partBack mobileContainer lg:min-h-screen">
        <div className="partContent">
          <div className="pt-10">
            <span className="text-[#47EAEA] font-bold text-6xl fontEB">
              BACK-END
            </span>
            <br />
            <span className="text-[#BDFFFF] font-bold text-6xl fontSB">
              CURRICULUM
            </span>
          </div>

          <div className="flex flex-col py-24">
            <div className="mb-10">
              <ul className="flex justify-between w-[320px] mb-2 curriUl">
                <li className="flex w-[120px] items-center justify-center text-center fontThin text-xl whitespace-nowrap">
                  Java를 활용한
                  <br />
                  객체지향 개념
                </li>
                <li className="flex w-[120px] items-center justify-center text-center fontThin text-xl whitespace-nowrap">
                  Spring Boot
                </li>
              </ul>
              <img
                src={images.track_backend_curri}
                alt="track_backend_curri"
                className="w-[320px] curriImg"
              />
            </div>

            <div className="ml-36 bottomcurri">
              <ul className="flex justify-between w-[320px] mb-4 curriUl BECurr">
                <li className="flex w-[120px] items-center justify-center text-center fontThin text-xl whitespace-nowrap">
                  JPA
                </li>
                <li className="flex w-[120px] items-center justify-center text-center fontThin text-xl whitespace-nowrap">
                  Spring Security
                </li>
              </ul>
              <img
                src={images.track_backend_curri}
                alt="track_backend_curri"
                className="w-[320px] curriImg"
              />
            </div>
          </div>

          <div className="text-lg leading-8 fontEL whitespace-nowrap">
            <span className="text-2xl fontBold">백엔드</span>는<br />
            백엔드(Backend)는 웹 또는 모바일 애플리케이션의 서버 측 부분으로,
            <br />
            사용자 요청을 처리하고 데이터를 관리하는 역할을 합니다.
            <br />
            주요 구성 요소로는 서버, 웹 프레임워크/런타임, 데이터베이스,
            <br />
            API, 보안, 스케일링 및 성능 최적화, 로그 및 모니터링이 있습니다.
            <br />
          </div>
        </div>
        <div className="w-1/2 rightBox"></div>
      </div>
    </>
  );
};

export default BackEnd;
