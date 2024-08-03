import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-20">
        <div className="w-full md:w-[610px] mb-10 md:mb-0 md:mr-20 text-center md:text-left">
          <span className="text-blue-500 text-4xl md:text-6xl fontEB leading-tight">
            반가워요!
            <br />
          </span>
          <span className="text-white text-4xl md:text-6xl fontEB leading-tight">
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
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-auto md:h-64 ml-0 md:ml-40 mb-20 relative">
      <div className="flex flex-col space-y-4 md:space-y-28 w-full md:w-1/5 text-center md:text-left">
        <div className="relative">
          <button
            className={`text-xl md:text-3xl fontMedium ${selectedTab === 'etc' ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('etc')}>
            [기타 의뢰]
          </button>
          <span className="hidden md:block absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img src={images.arrow} alt="arrow" className="w-full mt-2" />
          </span>
          {selectedTab === 'etc' && (
            <div className="block md:hidden bg-[#1C58DA] text-white p-4 rounded-lg w-full mt-4 flex fontLight text-base justify-center">
              <div>
                <span className="fontSB text-lg">기타 의뢰</span>는 카카오톡 채널 <br />
                "멋쟁이사자처럼 at 성결대"
                <br />로 문의 바랍니다.
                <br />
                <br />
                감사합니다!
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className={`text-xl md:text-3xl fontMedium ${
              selectedTab === 'Collaboration' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => setSelectedTab('Collaboration')}>
            [협업 문의]
          </button>
          <span className="hidden md:block absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img src={images.arrow} alt="arrow" className="w-full mt-2" />
          </span>
          {selectedTab === 'Collaboration' && (
            <div className="block md:hidden bg-[#34C242] text-white p-4 rounded-lg w-full mt-4 flex fontLight text-base justify-center">
              <div>
                <span className="fontSB text-lg">협업 문의</span>는 "sungkyul.univ@likelion.org" 위 메일 주소로 문의
                바랍니다.
                <br />
                <br />
                감사합니다!
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className={`text-xl md:text-3xl fontMedium ${selectedTab === 'inquiry' ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('inquiry')}>
            [문의 사항]
          </button>
          <span className="hidden md:block absolute bottom-0 left-0 w-full h-1 flex items-center mt-2">
            <img src={images.arrow} alt="arrow" className="w-full mt-2" />
          </span>
          {selectedTab === 'inquiry' && (
            <div className="block md:hidden bg-[#747474] text-white p-4 rounded-lg w-full mt-4 flex fontLight text-base justify-center">
              <div>
                <span className="fontSB text-lg">문의 사항</span>은 인스타그램 @likelion_sku DM으로 문의 바랍니다.
                <br />
                <br />
                감사합니다!
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex-grow flex items-center justify-center h-full md:h-auto">
        {selectedTab === 'etc' && (
          <div className="hidden md:block absolute top-0 md:top-auto bg-[#1C58DA] text-white p-4 rounded-lg w-60 md:w-72 h-36 md:h-44 flex fontLight text-base md:text-xl">
            <div>
              <span className="fontSB text-lg md:text-xl">기타 의뢰</span>는 카카오톡 채널 <br />
              "멋쟁이사자처럼 at 성결대"
              <br />로 문의 바랍니다.
              <br />
              <br />
              감사합니다!
            </div>
          </div>
        )}
        {selectedTab === 'Collaboration' && (
          <div className="hidden md:block absolute top-0 md:top-24 bg-[#34C242] text-white p-4 rounded-lg w-60 md:w-72 h-36 md:h-44 flex items-center justify-center fontLight text-base md:text-xl">
            <div>
              <span className="fontSB text-lg md:text-xl">협업 문의</span>는 "sungkyul.univ@likelion.org" 위 메일 주소로
              문의 바랍니다.
              <br />
              <br />
              감사합니다!
            </div>
          </div>
        )}
        {selectedTab === 'inquiry' && (
          <div className="hidden md:block absolute top-0 md:top-60 bg-[#747474] text-white p-4 rounded-lg w-60 md:w-72 h-36 md:h-44 flex items-center justify-center text-base md:text-xl fontLight">
            <div>
              <span className="fontSB text-lg md:text-xl">문의 사항</span>은 인스타그램 @likelion_sku DM으로 문의
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
