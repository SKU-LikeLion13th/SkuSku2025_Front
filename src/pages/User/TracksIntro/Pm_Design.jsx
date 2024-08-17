import React from 'react';
import { images } from '../../../utils/images';
import '../../../css/track.css';

const Pm_Design = () => {
  return (
    <>
      <div className="@container part partPm container flex items-center justify-center mx-auto pt-28 w-10/12">
        <div className="w-1/2 partContent">
          <div className="pt-10">
            <span className="text-[#FF669D] fontEB  text-6xl">PM/DESIGN</span>
            <br />
            <span className="text-[#FFBFD6] fontSB text-6xl">CURRICULUM</span>
          </div>

          <div className="py-10 @lg:py-32 @container">
            <ul className="flex justify-between w-[400px] @lg:w-[512px] mb-2 curriUl">
              <li className="w-[90px] text-center fontThin text-sm @lg:text-lg whitespace-nowrap">PM의 정의</li>
              <li className="w-[90px] text-center fontThin text-sm @lg:text-lg whitespace-nowrap">프로젝트 협업</li>
              <li className="w-[90px] text-center fontThin text-sm @lg:text-lg whitespace-nowrap">UI UX 디자인</li>
              <li className="w-[90px] text-center fontThin text-sm @lg:text-lg whitespace-nowrap">피그마 교육</li>
            </ul>
            <img src={images.track_pm_curri} alt="track_pm_curri" className="w-[512px] curriImg" />
          </div>

          <div className="text-lg leading-8 fontEL">
            <span className="text-2xl fontBold">UX/UI 디자이너</span>는<br />
            제품 또는 서비스의 사용자 경험을 개선하기 위해
            <br />
            사용자 연구, 프로토타입 제작, 디자인 시스템 구축 등을 수행하며,
            <br />
            직관적이고 효과적인 사용자 인터페이스(UI)를 설계하고 구현합니다.
            <br />
            <br />
            <br />
            <br />
            <span className="text-2xl fontBold">서비스 기획자</span>는<br />
            서비스 기획자는 사용자 요구사항을 분석하고 제품 또는 서비스의 기획과 전략을 개발하여
            <br />
            사용자들의 만족도를 높이고 비즈니스 목표를 달성합니다.
            <br />
            주로 데이터베이스와 서버 사이의 통신을 담당하여 클라이언트에게 필요한 데이터를 제공합니다.
          </div>
        </div>
        <div className="w-1/2 rightBox"></div>
      </div>
    </>
  );
};

export default Pm_Design;
