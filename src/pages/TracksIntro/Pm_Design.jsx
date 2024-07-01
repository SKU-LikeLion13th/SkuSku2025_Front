import React from 'react';
import { images } from '../../utils/images';

const Pm_Design = () => {
  return (
    <div className='container flex items-center justify-center mx-auto'>
        <div className='w-1/2'>
          <div>
            <span className='text-[#FF669D] font-bold text-6xl'>PM/DESIGN</span><br/>
            <span className='text-[#FFBFD6] font-bold text-6xl'>CURRICULUM</span>
          </div>
          
          <div className='py-32'>
            <img src={images.track_pm_curri} alt="track_pm_curri" className='w-4/5' />
          </div>

          <div className='leading-7'>
            <span className='font-bold text-2xl'>UX/UI 디자이너</span>는<br/>
              제품 또는 서비스의 사용자 경험을 개선하기 위해<br/>
              사용자 연구, 프로토타입 제작, 디자인 시스템 구축 등을 수행하며,<br/>
              직관적이고 효과적인 사용자 인터페이스(UI)를 설계하고 구현합니다.<br/><br/><br/><br/>

              <span className='font-bold text-2xl'>서비스 기획자</span>는<br/>
              서비스 기획자는 사용자 요구사항을 분석하고 제품 또는 서비스의 기획과 전략을 개발하여<br/>
              사용자들의 만족도를 높이고 비즈니스 목표를 달성합니다.<br/>
              주로 데이터베이스와 서버 사이의 통신을 담당하여 클라이언트에게 필요한 데이터를 제공합니다.
          </div>
        </div>
        <div className='w-1/2'></div>
        <div className='absolute right-0 top-3'><img src={images.track_pm_background} alt="track_pm_background" /></div>

    </div>);
};

export default Pm_Design;
