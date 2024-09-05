import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TiHome } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';

// 경로 템플릿을 위한 함수
const getPath = (track, subPath = '') => `/cyberCampus/intro/${track}${subPath}`;

// 과제 관련 경로 템플릿
const getAssignmentPath = (track, subPath) => getPath(track, `/assignment${subPath}`);

// 현재 경로가 버튼의 경로 패턴과 일치하는지 검사하는 함수
const isActivePath = (path, currentPath) => {
  // 버튼 경로에서 :id와 같은 동적 파라미터를 제외하고 비교
  const pathWithoutParams = path.replace(/\/:[^\s/]+/g, '');
  const currentPathWithoutParams = currentPath.replace(/\/[0-9]+$/, ''); // 끝에 붙은 숫자는 ID로 간주하고 제거

  return currentPathWithoutParams === pathWithoutParams;
};

const CyberCampusLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useParams();

  const buttons = [
    { title: '홈', route: '/', icon: <TiHome /> },
    { title: '사이버캠퍼스', route: '/cyberCampus/intro' },
    { title: '프론트엔드', route: getPath('FRONT-END') },
    { title: '백엔드', route: getPath('BACK-END') },
    { title: '기획&디자인', route: getPath('PM&DESIGN') },
    { title: '강의자료', route: getPath(track, '/lecture') },
    { title: '과제제출', route: getAssignmentPath(track, '') },
    { title: '완성된과제', route: getAssignmentPath(track, '/completedAssignment') },
    { title: '진행중인과제', route: getAssignmentPath(track, '/progressingAssignment') },
    { title: '오늘의과제', route: getAssignmentPath(track, '/todaysAssignment') },
    { title: '과제업로드', route: getAssignmentPath(track, '/todaysAssignment/todaysDetail') },
    { title: '과제업로드', route: getAssignmentPath(track, '/progressingAssignment/progressingDetail') },
    { title: '제출된과제', route: getAssignmentPath(track, '/completedAssignment/completedDetail') },
  ];

  // 현재 경로에 맞는 버튼 필터링
  const filteredButtons = buttons.filter(button => {
    const buttonPath = button.route;
    if (!track) return location.pathname.startsWith(buttonPath);
    return location.pathname.startsWith(buttonPath) || buttonPath === '/cyberCampus/intro';
  });

  // 현재 경로의 버튼에 굵기 적용
  const isActive = route => isActivePath(route, location.pathname);

  return (
    <div className="flex justify-center flex-wrap items-center w-[90%] xl:w-8/12 gap-2 mx-auto mt-16 lg:justify-start">
      {filteredButtons.map((button, index) => (
        <React.Fragment key={index}>
          <button
            className={`text-base fontSB flex items-center pt-0.5 ${
              isActive(button.route) ? 'font-bold text-black' : 'text-gray-400'
            } hover:underline`}
            onClick={() => navigate(button.route)}>
            {button.icon ? <span className="text-xl pb-0.5">{button.icon}</span> : button.title}
          </button>
          {index < filteredButtons.length - 1 && (
            <span className="font-bold text-gray-400">
              <IoIosArrowForward />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CyberCampusLocation;
