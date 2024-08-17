import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { images } from '../utils/images';
import '../css/nav.css';
import { useLogin } from '../utils/LoginContext';
import GoogleLoginBtn from './GoogleLoginBtn';
import NavTrack from './NavTrack';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

const NewNav = () => {
  const location = useLocation();
  const { handleLogout, isLoggedIn, name, track, trackColor } = useLogin();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    setBgColor(trackColor);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, name, trackColor]);

  const getNavItemStyle = (index) => {
    const activeStyle = {
      fontWeight: 'bold',
    };

    return {
      position: 'relative',
      padding: '0.2rem 1rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      ...(index === activeIndex && activeStyle)
    };
  };

  return (
    <div className={`pcNav fixed z-10 top-0 w-full mx-auto transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="px-5 container grid grid-cols-3 items-center justify-between mx-auto py-3">
        {/* likelion logo */}
        <Link to="/" onClick={() => {
            setActiveIndex(null);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}>
          <div className="flex items-center">
            <img className="w-9" src={images.likelion_logo} alt="likelion_logo" />
            <span className="text-[#3B79FF] fontBlack text-2xl ml-2">LIKELION SKU</span>
          </div>
        </Link>
        
        {/* <NavTrack /> */}
        {/* Menu */}
        <ul className="flex relative items-center">
          <Dropdown>
            <MenuButton variant="nautral" className='ignoreBtn'  onClick={() => setActiveIndex(0)}>
              <Link to='/frontend' key='TRACK'>
                <li style={getNavItemStyle(0)} className="menuStyle">TRACK</li>
              </Link>
            </MenuButton>

            <Menu className='menu'>
              <MenuItem className='menuItem'>
                <Link to='/frontend'>FRONT-END</Link>
              </MenuItem>
              <MenuItem className='menuItem'>
                <Link to='/backend'>BACK-END</Link>
              </MenuItem>
              <MenuItem className='menuItem'>
                <Link to='/pm_design'>PM/DESIGN</Link>
              </MenuItem>
            </Menu>
          </Dropdown>

          {/* <Link to='/frontend' key='TRACK' onClick={() => setActiveIndex(0)}>
            <li 
              style={getNavItemStyle(0)}
              className="menuStyle">TRACK</li>
          </Link> */}
          <Link to='/project' key='PROJECT' onClick={() => setActiveIndex(1)}>
            <li 
              style={getNavItemStyle(1)}
              className="menuStyle">PROJECT</li>
          </Link>
          <Link to='/teamIntro?tab12' key='TEAM' onClick={() => setActiveIndex(2)}>
            <li 
              style={getNavItemStyle(2)}
              className="menuStyle">TEAM</li>
          </Link>
          <Link to='/contact' key='CONTACT' onClick={() => setActiveIndex(3)}>
            <li 
              style={getNavItemStyle(3)}
              className="menuStyle">CONTACT</li>
          </Link>
          <Link to='/cyberCampus/Intro' key='CYBERCAMPUS' onClick={() => setActiveIndex(4)}>
            <li  
              style={getNavItemStyle(4)}
              className="menuStyle">CYBERCAMPUS</li>
          </Link>
        </ul>

        {/* 로그인 버튼 */}
        <div className='flex justify-end'>
          {isLoggedIn ?
          <div className='flex items-center justify-center'>
            <div className='flex items-center'>
              <div 
                style={{ backgroundColor: bgColor }}
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-[50%]`}>🦁</div>
              <span className='text-xs px-2'>{track}</span>
              <span className='font-bold'>{name}님</span>
            </div>
            <div className='px-2 text-[gray]'>|</div>
            <button onClick={handleLogout} className='text-xs'>LOGOUT</button> 
          </div>  
          :
            // <GoogleLoginBtn width={'100px'} type={'icon'} shape={'circle'}/>
            <GoogleLoginBtn size={'large'} width={'50'} type={'standard'} shape={'rectangular'} />
          }
        </div>
      </div>
    </div>
  );
};

export default NewNav;