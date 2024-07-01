import React, { useEffect, useState } from 'react';
import { images } from '../utils/images';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setPathname(path);
  }, [location]);

  const navItems = [
    { name: 'TRACK', paths: ['frontend', 'backend', 'pm_design'], link: '/frontend' },
    { name: 'PROJECT', paths: ['project'], link: '/project' },
    { name: 'TEAM', paths: ['teamIntro'], link: '/teamIntro' },
    { name: 'CONTACT', paths: ['contact'], link: '/contact' },
  ];

  return (
    <div className="container flex items-center justify-between mx-auto py-10 mb-5">
      <Link to="/">
        <div className="flex items-center">
          <img className="w-10" src={images.likelion_logo} alt="likelion_logo" />
          <span className="text-[#3B79FF] fontBlack text-3xl ml-2">LIKELION SKU</span>
        </div>
      </Link>

      <div className="flex">
        {navItems.map((item, index) => (
          <Link to={item.link}>
            <div
              key={index}
              className={`px-8 ${index < navItems.length - 1 && 'border-r-[1px] border-[#4b4b4b]'} ${
                item.paths.includes(pathname) ? 'font-bold text-lg' : ''
              }`}>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;
