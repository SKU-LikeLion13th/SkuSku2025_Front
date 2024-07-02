import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setPathname(path);
  }, [location]);

  const getNavItemStyle = (index, navItems, pathname, item) => {
    const hoveredStyle = {
      color: 'black',
      backgroundColor: '#D9D9D9',
      borderRadius: '100px 100px 100px 0px',
      WebkitBorderRadius: '100px 100px 100px 0px',
      MozBorderRadius: '100px 100px 100px 0px',
    };
  
    return {
      position: 'relative',
      padding: '0.4rem 1.2rem',
      width: '130px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      // hover
      ...(isHovered === index ? hoveredStyle : { color: 'inherit' }),
      borderRight: index < navItems.length - 1 ? '1px solid #4b4b4b' : 'none',
      backgroundColor: isHovered === index ? '#D9D9D9' : 'transparent',
    };
  };
  
  const hoverStyle = () => {
    let borderRadius = '0px';
    if (isHovered === 0) {
      borderRadius = '0px 30px 30px 30px';
    } else if (isHovered === 3) {
      borderRadius = '30px 0px 30px 30px';
    } else if (isHovered) {
      borderRadius = '30px 30px 30px 30px';
    }

    return {
      color: 'rgb(0,0,0,0.5)',
      width: '520px',
      backgroundColor: 'rgba(217, 217, 217, 0.5)',
      position: 'absolute',
      top: '6rem',
      padding: '0.8rem 0',
      borderRadius: borderRadius,
      WebkitBorderRadius: borderRadius,
      MozBorderRadius: borderRadius,
    }
  };
  
  const navItems = [
    { name: 'TRACK', paths: ['frontend', 'backend', 'pm_design'], link: '/frontend' },
    { name: 'PROJECT', paths: ['project'], link: '/project' },
    { name: 'TEAM', paths: ['teamIntro'], link: '/teamIntro' },
    { name: 'CONTACT', paths: ['contact'], link: '/contact' },
  ];

  const renderLinks = (links) => (
    <ul className='w-1/4 text-center'>
      {links.map(({ to, label }) => (
        <Link to={to} key={label}>
          <li className='hover:text-black hover:font-bold'>{label}</li>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className="container flex items-center justify-between mx-auto py-10 mb-5">
      <Link to="/">
        <div className="flex items-center">
          <img className="w-10" src={images.likelion_logo} alt="likelion_logo" />
          <span className="text-[#3B79FF] fontBlack text-3xl ml-2">LIKELION SKU</span>
        </div>
      </Link>

      <div className='flex flex-col'>
        <div className="flex">
          {navItems.map((item, index) => (
            <Link to={item.link}>
              <div
                key={index}
                style={getNavItemStyle(index, navItems, pathname, item)}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <div className='w-full h-8'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(null)}></div>

        {isHovered || isHovered === 0 ? (
          <div style={hoverStyle()} className='flex rounded-2xl'>
            {renderLinks([
              { to: '/frontend', label: 'FRONT-END' },
              { to: '/backend', label: 'BACK-END' },
              { to: '/pm_design', label: 'PM/DESIGN' },
            ])}
            {renderLinks([
              { to: '/project', label: 'ALL' },
              { to: '/project', label: '12th' },
              { to: '/project', label: '11th' },
            ])}
            {renderLinks([
              { to: '/teamIntro', label: '12th' },
              { to: '/teamIntro', label: '11th' },
            ])}
            {renderLinks([
              { to: '/contact', label: '기타 의뢰' },
              { to: '/contact', label: '협업 문의' },
              { to: '/contact', label: '문의 사항' },
            ])}
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default Nav;
