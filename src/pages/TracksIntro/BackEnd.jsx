import React from 'react';
import { images } from '../../utils/images';

const BackEnd = () => {
  return (
    <>
    <div className='container flex items-center justify-center mx-auto'>
        <div className='w-1/2'>
          <div>
            <span className='text-[#47EAEA] font-bold text-6xl'>BACK-END</span><br/>
            <span className='text-[#BDFFFF] font-bold text-6xl'>CURRICULUM</span>
          </div>
          
          <div className='py-28 flex flex-col'>
            <div className='mb-10'>
              <ul className='flex justify-between w-[320px] mb-2'>
                <li className='w-[120px] text-center'>Java를 활용한<br />객체지향 개념</li>
                <li className='w-[120px] text-center'>Spring setting<br />& Thymeleaf</li>
              </ul>
              <img src={images.track_backend_curri} alt="track_backend_curri" className='w-[320px]' />
            </div>

            <div className='ml-36'>
              <ul className='flex justify-between w-[320px] mb-2'>
                <li className='w-[120px] text-center'>Spring<br />API 통신</li>
                <li className='w-[120px] text-center'>DB Connection<br />& JPA (MYSQL)</li>
              </ul>
              <img src={images.track_backend_curri} alt="track_backend_curri" className='w-[320px]' />
            </div>
          </div>

          <div className='leading-7'>
            <span className='font-bold text-2xl'>백엔드</span>는<br/>
            백엔드(Backend)는 웹 또는 모바일 애플리케이션의 서버 측 부분으로,<br/>
            사용자 요청을 처리하고 데이터를 관리하는 역할을 합니다.<br/>
            주요 구성 요소로는 서버, 웹 프레임워크/런타임, 데이터베이스,<br/>
            API, 보안, 스케일링 및 성능 최적화, 로그 및 모니터링이 있습니다.<br/>
          </div>
        </div>
        <div className='w-1/2'></div>
        <div className='absolute right-0 top-35 -z-10'><img src={images.track_backend_background} alt="track_backend_background" /></div>
    </div>
    </>
    );
};

export default BackEnd;
