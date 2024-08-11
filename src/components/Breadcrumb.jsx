import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { images } from '../utils/images'; // 이미지가 있는 utils 파일에서 가져오기

const Breadcrumb = () => {
  const location = useLocation();

  // 경로명과 실제 표시될 이름을 매핑
  const pathNamesMap = {
    admin: '과제 제출',
    AssignmentManagement: ' 오늘의 과제',
  };

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="container mr-24 mt-10">
      <nav className="text-gray-500 text-sm flex items-center pl-4 fontSB">
        <Link to="/" className="hover:underline flex items-center">
          <FaHome className="mr-2" />
        </Link>
        <img src={images.breadArrow} alt="Arrow Icon" className="mx-1 w-auto h-auto inline-block align-middle" />
        <Link to="/" className="hover:underline mr-1 fontSB inline-block align-middle">
          &nbsp;사이버캠퍼스
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = pathNamesMap[value] || decodeURIComponent(value);

          return isLast ? (
            <span key={to} className="text-gray-900 fontBold pl-1 inline-block align-middle">
              <img src={images.breadArrow} alt="Arrow Icon" className="mx-1 w-auto h-auto inline-block align-middle" />
              {displayName}
            </span>
          ) : (
            <span key={to} className="text-gray-500 inline-block align-middle">
              <img src={images.breadArrow} alt="Arrow Icon" className="mx-1 w-auto h-auto inline-block align-middle" />
              <Link to={to} className="hover:underline mx-2 inline-block align-middle">
                {displayName}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
