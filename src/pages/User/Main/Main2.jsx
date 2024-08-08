import React from 'react';
import { images } from '../../../utils/images';

const Main2 = () => {
  return (
    <div
      id="main2"
      className="relative w-full min-h-screen pt-0 mt-0 bg-center bg-cover main2 snap-section"
      style={{ backgroundImage: `url(${images.mainP2})` }}>
      <div className="flex flex-col items-center w-full min-h-screen text-xl text-center justify-evenly fontThin">
        <p className="pt-5">
          <span className="fontMedium">성결대학교 멋쟁이사자처럼</span>은
          <br />
          자신이 원하는 IT 서비스를 구현하고 싶은
          <br />
          성결대학교 학생들이 모인 동아리입니다.
        </p>
        <div>
          <p>
            성결대학교 멋쟁이사자처럼만의
            <br />
            <span className="fontMedium">3가지 방향성</span>
          </p>
          <div className="grid w-full grid-cols-1 gap-8 pt-16 xl:grid-cols-3 xl:gap-32">
            <div className="flex flex-col items-center">
              <img src={images.icon1} alt="자기주도성" className="mb-4" />
              <p className="mb-4 fontMedium">자기주도성</p>
              <p className="text-lg">
                나의 커리어를 직접 설계하고,
                <br />
                만들어갈 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={images.icon2} alt="협력성" className="my-2 mb-5" />
              <p className="mb-4 fontMedium">협력성</p>
              <p className="text-lg">
                동료들과 개발 고민을 공유하며,
                <br />
                함께 협력하고 성장솔루션을 찾아볼 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={images.icon3} alt="가능성" className="mb-4" />
              <p className="mb-4 fontMedium">가능성</p>
              <p className="text-lg">
                자신이 꿈꾸던 IT 서비스를 현실로
                <br />
                구현하는 기회가 제공됩니다.
              </p>
            </div>
          </div>
        </div>
        <p>
          <span className="fontSB">"내 아이디어를 내 손으로 실현한다."</span> 라는 모토를 가지고,
          <br />
          실제 서비스를 구현하며 개발자의 꿈을 이루는데
          <br />
          한걸음 더 다가가고자 합니다.
        </p>
      </div>
    </div>
  );
};

export default Main2;
