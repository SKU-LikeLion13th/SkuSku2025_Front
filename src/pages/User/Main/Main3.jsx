import React, { useEffect, useRef } from 'react';
import { images } from '../../../utils/images';

const Main3 = () => {
  const scheduleImageRef = useRef(null);
  const fullyVisibleRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const image = scheduleImageRef.current;
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const bottomOfWindow = windowHeight;

      if (fullyVisibleRef.current) {
        return;
      }

      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleRatio = Math.min((windowHeight - rect.top) / (windowHeight + rect.height), 1);
        const newOpacity = Math.min(visibleRatio * 2, 1); // Multiplied by 2 to increase sensitivity

        image.style.opacity = newOpacity;

        if (newOpacity >= 1) {
          fullyVisibleRef.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full main3 snap-section">
      <div className="absolute flex items-start justify-center w-full">
        <img src={images.likelion} alt="likelion" className="w-1/4 py-24 z-0 xl:w-1/6" />
      </div>
      <div className="flex flex-col items-center justify-center h-full py-20 text-xl text-center fontRegular">
        <div className="flex flex-col justify-around mb-32 h-1/5">
          <div className="pb-28">
            <p className="text-[#3B79FF] fontSB pb-2">Q.</p>
            <p>
              성결대 멋쟁이사자처럼은 주로 <span className="text-[#3B79FF] fontMedium">어떤 활동</span>을 하나요?
            </p>
          </div>
          <div>
            <p className="text-[#3B79FF] fontSB pb-2">A.</p>
            <p>
              성결대 멋쟁이사자처럼에서는 <span className="text-[#3B79FF] fontMedium">정기세션</span>과{' '}
              <span className="text-[#3B79FF] fontMedium">스터디, 아이디어톤</span>
              <br />
              마지막으로 <span className="text-[#3B79FF] fontMedium">해커톤</span>을 주로 진행합니다.
            </p>
          </div>
        </div>
        <img
          ref={scheduleImageRef}
          src={images.schedule}
          alt="멋사 스케줄"
          className="w-4/5 transition-opacity duration-500 opacity-0 xl:w-3/5 z-[2]"
        />
      </div>
    </div>
  );
};

export default Main3;
