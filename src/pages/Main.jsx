import React from 'react';
import MainSlider from '../components/MainSlider';
import { images } from '../utils/images';

const Main = () => {
  return (
    <div className='main-container'>
      <div className='main1 relative w-full mb-0 pb-0'>
        <MainSlider />
        <div className="absolute inset-0 flex flex-col justify-between text-white">
          <div className="flex items-center justify-center mt-10 h-full">
            <div className="title text-[6rem] md:text-[9rem] leading-none fontEB">
              <p className="mb-6 text-[#3B79FF]">SKU</p>
              <p className="">LIKELION 12th</p>
            </div>
          </div>
          <div className="flex items-end justify-center pb-10">
            <img src={images.mouse} alt="마우스 모양" className='mr-3'/>
            <p className="fontSB text-xl text-[#666666] ml-3 flex items-center h-full">Scroll down</p>
          </div>
        </div>
      </div>
      <div className='main2 relative w-full mt-0 pt-0'>
        <img src={images.mainP2} alt='두번째 파트 메인' className='w-full h-full object-cover'/>
        <div className='absolute inset-0 flex flex-col justify-evenly items-center text-center fontThin text-2xl w-full'>
          <p><span className='fontMedium'>성결대학교 멋쟁이사자처럼</span>은 
            <br/>자신이 원하는 IT 서비스를 구현하고 싶은
            <br/> 성결대학교 학생들이 모인 동아리입니다.</p>
          <div>
            <p>성결대학교 멋쟁이사자처럼만의<br/>
            <span className='fontMedium'>3가지 방향성</span></p>
            <div className='grid grid-cols-3 gap-32 w-full pt-28'>
              <div className='flex flex-col items-center'>
                <img src={images.icon1} alt='자기주도성' className='mb-4'/>
                <p className='mb-4 fontMedium'>자기주도성</p>
                <p className='text-lg'>나의 커리어를 직접 설계하고,<br/>만들어갈 수 있습니다.</p>
              </div>
              <div className='flex flex-col items-center'>
                <img src={images.icon2} alt='협력성' className='my-2 mb-5'/>
                <p className='mb-4 fontMedium'>협력성</p>
                <p className='text-lg'>동료들과 개발 고민을 공유하며,<br/>함께 협력하고 성장솔루션을 찾아볼 수 있습니다.</p>
              </div>
              <div className='flex flex-col items-center'>
                <img src={images.icon3} alt='가능성' className='mb-4'/>
                <p className='mb-4 fontMedium'>가능성</p>
                <p className='text-lg'>자신이 꿈꾸던 IT 서비스를 현실로<br/>구현하는 기회가 제공됩니다.</p>
              </div>
            </div>
          </div>
          <p><span className='fontSB'>"내 아이디어를 내 손으로 실현한다."</span> 라는 모토를 가지고,
            <br/>실제 서비스를 구현하며 개발자의 꿈을 이루는데
            <br/>한걸음 더 다가가고자 합니다.</p>
        </div>
      </div>
      <div className='main3 relative w-full'>

      </div>
    </div>
  );
};

export default Main;
