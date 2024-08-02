import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { Link, useLocation } from 'react-router-dom';
import GoogleLoginBtn from './GoogleLoginBtn';
import { CiMenuBurger } from "react-icons/ci";

const MobileNav = () => {
  const [view, setView] = useState(false); 
  const location = useLocation();
  const [pathname, setPathname] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setPathname(path);
  }, [location]);

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
      width: '110px',
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
    { name: 'TEAM', paths: ['teamIntro'], link: '/teamIntro' },
    { name: 'CONTACT', paths: ['contact'], link: '/contact' },
  ];

  const renderLinks = (links) => (
    <ul className='w-1/4 text-center'>
      {links.map(({ to, label, index}) => (
        <Link to={to} key={label} onClick={() => setActiveIndex(index)}>
          <li className='hover:text-black hover:font-bold'>{label}</li>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className='container flex items-center justify-between mx-auto'>
      <Link to="/" onClick={() => setActiveIndex(null)}>
        <div className="flex items-center">
          <img className="w-9" src={images.likelion_logo} alt="likelion_logo" />
        </div>
      </Link>

      <ul onClick={() => {setView(!view)}} className='text-white relative'> 
        <CiMenuBurger size={25} />
        {view && <Dropdown />} 
      </ul>
    </div>
  );
};

export default MobileNav;

function Dropdown() {

  return (
    <>
    <div className='text-white absolute p-3'>
      <li>마이페이지</li>
      <li>로그아웃</li>
    </div>
    </>
  );
}
