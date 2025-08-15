import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../utils/images";
import "../css/nav.css";
import { useLogin } from "../utils/LoginContext";
import GoogleLoginBtn from "./GoogleLoginBtn";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const NewNav = () => {
  const location = useLocation();
  const { handleLogout, isLoggedIn, contextUserInfo } = useLogin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [info, setInfo] = useState({
    name: contextUserInfo.name,
    track: contextUserInfo.track,
    color: contextUserInfo.color,
  });

  useEffect(() => {
    if (
      location.pathname.startsWith("/frontend") ||
      location.pathname.startsWith("/backend") ||
      location.pathname.startsWith("/pm_design")
    ) {
      setActiveIndex(0);
    } else if (location.pathname.startsWith("/project")) {
      setActiveIndex(1);
    } else if (location.pathname.startsWith("/teamIntro")) {
      setActiveIndex(2);
    } else if (location.pathname.startsWith("/contact")) {
      setActiveIndex(3);
    } else {
      setActiveIndex(null);
    }
  }, [location]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      setInfo(JSON.parse(userInfo));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const getNavItemStyle = (index) => {
    const activeStyle = {
      fontFamily: "Pretendard-ExtraBold",
    };

    return {
      position: "relative",
      padding: "0.2rem 1rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      ...(index === activeIndex && activeStyle),
    };
  };

  const handleClick = () => {
    alert("새로운 스쿠스쿠를 사용해주세요! https://sku-sku.com/");
  };

  return (
    <div
      className={`pcNav fixed z-10 top-0 w-full mx-auto transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="container flex items-center justify-between px-5 py-3 mx-auto">
        {/* likelion logo */}
        <Link
          to="/"
          onClick={() => {
            setActiveIndex(null);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div className="flex items-center">
            <img
              className="w-9"
              src={images.likelion_logo}
              alt="likelion_logo"
            />
            <span className="text-[#3B79FF] fontBlack text-2xl ml-2">
              LIKELION SKU
            </span>
          </div>
        </Link>

        {/* Menu */}
        <ul className="relative flex items-center">
          <Dropdown>
            <MenuButton
              variant="nautral"
              className="ignoreBtn"
              onClick={() => setActiveIndex(0)}
            >
              <Link to="#" key="TRACK">
                <li style={getNavItemStyle(0)} className="menuStyle">
                  TRACK
                </li>
              </Link>
            </MenuButton>

            <Menu className="menu">
              <MenuItem className="menuItem">
                <Link to="/frontend">FRONT-END</Link>
              </MenuItem>
              <MenuItem className="menuItem">
                <Link to="/backend">BACK-END</Link>
              </MenuItem>
              <MenuItem className="menuItem">
                <Link to="/pm_design">DESIGN</Link>
              </MenuItem>
            </Menu>
          </Dropdown>

          {/* <Link to='/frontend' key='TRACK' onClick={() => setActiveIndex(0)}>
            <li 
              style={getNavItemStyle(0)}
              className="menuStyle">TRACK</li>
          </Link> */}
          <Link to="/project" key="PROJECT" onClick={() => setActiveIndex(1)}>
            <li style={getNavItemStyle(1)} className="menuStyle">
              PROJECT
            </li>
          </Link>
          <Link to="/teamIntro" key="TEAM" onClick={() => setActiveIndex(2)}>
            <li style={getNavItemStyle(2)} className="menuStyle">
              TEAM
            </li>
          </Link>
          <Link to="/contact" key="CONTACT" onClick={() => setActiveIndex(3)}>
            <li style={getNavItemStyle(3)} className="menuStyle">
              CONTACT
            </li>
          </Link>
          <button key="CYBERCAMPUS" onClick={handleClick}>
            <li style={getNavItemStyle(4)} className="menuStyle">
              CYBERCAMPUS
            </li>
          </button>
        </ul>

        {/* 로그인 버튼 */}
        <div className="flex justify-end">
          {isLoggedIn ? (
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div
                  style={{ backgroundColor: info.color }}
                  className={`flex items-center justify-center w-[30px] h-[30px] rounded-[50%]`}
                >
                  🦁
                </div>
                <span className="px-2 text-xs">{info.track}</span>
                <span className="font-bold">{info.name}님</span>
              </div>
              <div className="px-2 text-[gray]">|</div>
              <button onClick={handleLogout} className="text-xs">
                LOGOUT
              </button>
            </div>
          ) : (
            // <GoogleLoginBtn width={'100px'} type={'icon'} shape={'circle'}/>
            <GoogleLoginBtn
              size={"large"}
              width={"50"}
              type={"standard"}
              shape={"rectangular"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewNav;
