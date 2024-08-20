import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { images } from '../utils/images'; // 이미지가 있는 utils 파일에서 가져오기

const Breadcrumb = () => {
  const location = useLocation();

  // 경로명과 실제 표시될 이름을 매핑
  const pathNamesMap = {
    admin: '과제 제출 관리',
    AssignmentManagement: '오늘의 과제',
  };

  const pathnames = location.pathname.split('/').filter(x => x);

  // 동일한 스타일을 위한 공통 클래스
  const commonClassNames = 'text-gray-500 hover:underline fontSB text-sm mx-2';

  return (
    <div className="container mr-24 mt-10">
      <nav className="text-gray-500 text-sm flex items-center pl-4 fontSB">
        {/* 집 아이콘이 '/'로 이동하도록 설정 */}
        <Link to="/" className="hover:underline flex items-center">
          <FaHome className="mr-2" />
        </Link>
        <span className="flex items-center">
          <img src={images.breadArrow} alt="Arrow Icon" className="mx-1 w-auto h-auto inline-block align-middle" />
        </span>
        <Link to="/admin/main" className={`flex items-center ${commonClassNames}`}>
          관리자 페이지
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = pathNamesMap[value] || decodeURIComponent(value);

          return (
            <span key={to} className="flex items-center">
              <img src={images.breadArrow} alt="Arrow Icon" className="mx-1 w-auto h-auto inline-block align-middle" />
              {isLast ? (
                <span className="text-gray-900 fontBold pl-1">{displayName}</span>
              ) : (
                <Link to={value === 'admin' ? '/admin/assignmentIntro' : to} className={`${commonClassNames}`}>
                  {displayName}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
