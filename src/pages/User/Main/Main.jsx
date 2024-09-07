import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Main1 from './Main1';
import Main2 from './Main2';
import Main3 from './Main3';
import Main4 from './Main4';
import Main5 from './Main5';

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  useEffect(() => {
    // 페이지 새로고침 시 스크롤을 맨 위로 설정
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0); // 짧은 지연 후 스크롤을 맨 위로 이동

    // GSAP 애니메이션과 ScrollTrigger 설정
    gsap.utils.toArray('.section').forEach(section => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 }, // 애니메이션 시작 상태
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // 섹션이 뷰포트 80% 지점에 도달할 때 시작
            toggleActions: 'play none none reverse', // 애니메이션 제어
            markers: false, //
          },
        },
      );
    });
  }, []);

  return (
    <div className="w-full">
      <div className="section">
        <Main1 />
      </div>
      <div className="section">
        <Main2 />
      </div>
      <div className="section">
        <Main3 />
      </div>
      <div className="container mx-auto section">
        <Main4 />
        <Main5 />
      </div>
    </div>
  );
};

export default Main;
