import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full px-6 lg:px-20">
        <div className="w-full lg:w-[610px] mb-10 lg:mb-0 lg:mr-20">
          <span className="text-blue-500 text-4xl lg:text-6xl fontEB leading-tight">
            반가워요!
            <br />
          </span>
          <span className="text-white text-4xl lg:text-6xl fontEB leading-tight">
            어떤 것을
            <br />
            도와드릴까요?
          </span>
        </div>
        <ContactTabs />
      </div>
    </div>
  );
};

const ContactTabs = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('etc');

  useEffect(() => {
    const tab = location.search.replace('?', '');
    setSelectedTab(tab);
  }, [location]);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center space-y-10 lg:space-y-0 lg:space-x-10 w-full lg:h-64 mb-10 lg:mb-20 relative">
      <div className="flex flex-col space-y-10 lg:space-y-28 w-full lg:w-1/5">
        <button
          className={`text-xl lg:text-3xl fontMedium flex items-center relative ${
            selectedTab === 'etc' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setSelectedTab('etc')}>
          [기타 의뢰]
          <span className="absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img
              src={images.arrow}
              alt="arrow"
              className={`w-12 h-6 lg:w-auto lg:h-auto mt-8 ${selectedTab === 'etc' ? 'opacity-100' : 'opacity-50'}`}
            />
          </span>
        </button>
        <button
          className={`text-xl lg:text-3xl fontMedium flex items-center relative ${
            selectedTab === 'Collaboration' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setSelectedTab('Collaboration')}>
          [협업 문의]
          <span className="absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img
              src={images.arrow}
              alt="arrow"
              className={`w-12 h-6 lg:w-auto lg:h-auto mt-8 ${
                selectedTab === 'Collaboration' ? 'opacity-100' : 'opacity-50'
              }`}
            />
          </span>
        </button>
        <button
          className={`text-xl lg:text-3xl fontMedium flex items-center relative ${
            selectedTab === 'inquiry' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setSelectedTab('inquiry')}>
          [문의 사항]
          <span className="absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img
              src={images.arrow}
              alt="arrow"
              className={`w-12 h-6 lg:w-auto lg:h-auto mt-8 ${
                selectedTab === 'inquiry' ? 'opacity-100' : 'opacity-50'
              }`}
            />
          </span>
        </button>
      </div>
      <div className="relative flex-grow flex items-center justify-center h-full">
        {selectedTab === 'etc' && (
          <div className="absolute top-0 bg-[#1C58DA] text-white p-4 rounded-lg w-full lg:w-72 h-44 flex fontLight text-base lg:text-xl">
            <div>
              <span className="fontSB text-lg lg:text-xl">기타 의뢰</span>는 카카오톡 채널 <br />
              "멋쟁이사자처럼 at 성결대"
              <br />로 문의 바랍니다.
              <br />
              <br />
              감사합니다!
            </div>
          </div>
        )}
        {selectedTab === 'Collaboration' && (
          <div className="absolute top-24 bg-[#34C242] text-white p-4 rounded-lg w-full lg:w-72 h-44 flex items-center justify-center fontLight text-base lg:text-xl">
            <div>
              <span className="fontSB text-lg lg:text-xl">협업 문의</span>는 "sungkyul.univ@likelion.org" 위 메일 주소로
              문의 바랍니다.
              <br />
              <br />
              감사합니다!
            </div>
          </div>
        )}
        {selectedTab === 'inquiry' && (
          <div className="absolute top-48 bg-[#747474] text-white p-4 rounded-lg w-full lg:w-72 h-44 flex items-center justify-center text-base lg:text-xl fontLight">
            <div>
              <span className="fontSB text-lg lg:text-xl">문의 사항</span>은 인스타그램 @likelion_sku DM으로 문의
              바랍니다.
              <br />
              <br />
              감사합니다!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
