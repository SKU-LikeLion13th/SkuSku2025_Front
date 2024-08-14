import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { Link, useLocation } from 'react-router-dom';
import '../css/nav.css';
import GoogleLoginBtn from './GoogleLoginBtn';
import { useLogin } from '../utils/LoginContext';

const Nav = () => {
  const location = useLocation();
  const { handleLogout, isLoggedIn, name, track, trackColor } = useLogin();
  
  const [pathname, setPathname] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setPathname(path);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavItemStyle = (index, navItems, pathname, item) => {
    const hoveredStyle = {
      color: 'black',
      backgroundColor: '#D9D9D9',
      borderRadius: '100px 100px 100px 0px',
      WebkitBorderRadius: '100px 100px 100px 0px',
      MozBorderRadius: '100px 100px 100px 0px',
    };

    const activeStyle = {
      fontWeight: 'bold',
    };

    return {
      position: 'relative',
      padding: '0.2rem 1rem',
      // width: '110px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      // hover
      ...(isHovered === index ? hoveredStyle : {}),
      ...(activeIndex === index ? activeStyle : {}),
      // borderRight: index < navItems.length - 1 ? '1px solid #4b4b4b' : 'none',
      backgroundColor: isHovered === index ? '#D9D9D9' : 'transparent',
      color: isHovered === index ? 'black' : 'inherit',
    };
  };

  const hoverStyle = () => {
    let borderRadius = '0px';
    if (isHovered === 0) {
      borderRadius = '0px 30px 30px 30px';
    } else if (isHovered === 3) {
      borderRadius = '30px 0px 30px 30px';
    } else if (isHovered !== null) {
      borderRadius = '30px 30px 0px 30px';
    }

    return {
      color: 'rgb(0,0,0,0.5)',
      width: '430px',
      backgroundColor: 'rgba(217, 217, 217, 0.5)',
      position: 'absolute',
      top: '3rem',
      padding: '0.8rem',
      left: '8px',
      borderRadius: borderRadius,
      WebkitBorderRadius: borderRadius,
      MozBorderRadius: borderRadius,
    };
  };

  const navItems = [
    { name: 'TRACK', paths: ['frontend', 'backend', 'pm_design'], link: '/frontend' },
    { name: 'PROJECT', paths: ['project'], link: '/project' },
    { name: 'TEAM', paths: ['teamIntro'], link: '/teamIntro?tab12' },
    { name: 'CONTACT', paths: ['contact'], link: '/contact' },
    { name: 'CYBERCAMPUS', paths: ['/cyberCampus/Intro'], link: '/cyberCampus/Intro' },
  ];

  const renderLinks = links => (
    <ul className="w-1/4 text-center">
      {links.map(({ to, label, index }) => (
        <Link to={to} key={label} onClick={() => setActiveIndex(index)}>
          <li className="hover:text-black hover:font-bold">{label}</li>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className={`pcNav fixed z-10 top-0 w-full mx-auto transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="px-5 container flex items-center justify-between mx-auto py-3">
        <Link to="/" onClick={() => setActiveIndex(null)}>
          <div className="flex items-center">
            <img className="w-9" src={images.likelion_logo} alt="likelion_logo" />
            <span className="text-[#3B79FF] fontBlack text-2xl ml-2">LIKELION SKU</span>
          </div>
        </Link>

        <div className="flex flex-col items-center relative">
          <div className="flex relative items-center">
            {navItems.map((item, index) => (
              <Link to={item.link} key={index}>
                <div
                  style={getNavItemStyle(index, navItems, pathname, item)}
                  // onMouseEnter={() => setIsHovered(index)}
                  // onMouseLeave={() => setIsHovered(null)}
                  onClick={() => setActiveIndex(index)}>
                  {item.name}
                </div>
              </Link>
            ))}
            <div
              className="w-full h-3 absolute -bottom-5"
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(null)}
              >
            </div>

            <div>
            {isLoggedIn ?
            <div className='flex items-center'>
              <div className='flex items-center'>
                <div className={`flex items-center justify-center w-[30px] h-[30px] rounded-[50%] bg-[${trackColor}]`}>🦁</div>
                <span className='text-xs px-2'>{track}</span>
                <span className='font-bold'>{name}님</span>
              </div>
              
              <button onClick={handleLogout} className='ml-3 text-xs'>LOGOUT</button> 
            </div>  
            :
              <GoogleLoginBtn width={'100px'} type={'icon'} shape={'circle'}/>
            }
            </div>
          </div>

          {isHovered !== null ? (
            <div
              style={hoverStyle()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(null)}
              className="flex rounded-2xl">
              {renderLinks([
                { to: '/frontend', label: 'FRONT-END', index: 0 },
                { to: '/backend', label: 'BACK-END', index: 0 },
                { to: '/pm_design', label: 'PM/DESIGN', index: 0 },
              ])}
              {renderLinks([
                { to: '/project', label: 'ALL', index: 1 },
                { to: '/project', label: '12th', index: 1 },
                { to: '/project', label: '11th', index: 1 },
              ])}
              {renderLinks([
                { to: '/teamIntro?tab12', label: '12th', index: 2 },
                { to: '/teamIntro?tab11', label: '11th', index: 2 },
              ])}
              {renderLinks([
                { to: '/contact?etc', label: '기타 의뢰', index: 3 },
                { to: '/contact?Collaboration', label: '협업 문의', index: 3 },
                { to: '/contact?inquiry', label: '문의 사항', index: 3 },
              ])}
              {renderLinks([
                { to: '/cyberCampus/Intro', label: 'CYBERCAMPUS', index: 4 }
              ])}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
