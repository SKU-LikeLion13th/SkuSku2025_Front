import { Link, useLocation } from "react-router-dom";
import { images } from "../utils/images";
import { useEffect, useState } from "react";
import "../css/nav.css";
import { useNavbar } from "../utils/navbar-context";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { useLogin } from "../utils/LoginContext";
// import { getToken } from "../utils/Auth";

const ShowNav = () => {
  const { handleLogout, isLoggedIn, contextUserInfo } = useLogin();
  const [info, setInfo] = useState({
    name: contextUserInfo.name,
    track: contextUserInfo.track,
    color: contextUserInfo.color,
  });

  const { setIsOpen } = useNavbar();
  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setInfo(JSON.parse(userInfo));
    }
  }, [isLoggedIn]);

  return (
    <div className="Navbar flex min-h-screen overflow-y-auto">
      <div className="flex flex-col items-center justify-center">
        <ul className="NanumSquareEB flex flex-col items-center justify-center gap-y-6 text-2xl">
          <li className="px-7 w-full text-start text-4xl">
            <Link to="/frontend" onClick={closeNav}>
              TRACK
            </Link>
          </li>
          <ul className="flex items-center">
            <li className="fontThin px-7 w-full text-start text-md">
              <Link to="/frontend" onClick={closeNav}>
                FRONTEND
              </Link>
            </li>
            <li className="fontThin px-7 w-full text-start text-md">
              <Link to="/backend" onClick={closeNav}>
                BACKEND
              </Link>
            </li>
            <li className="fontThin px-7 w-full text-start text-md whitespace-nowrap">
              <Link to="/pm_design" onClick={closeNav}>
                PM & DESIGN
              </Link>
            </li>
          </ul>
          <li className="px-7 py-3 w-full text-start text-4xl">
            <Link to="/project" onClick={closeNav}>
              PROJECT
            </Link>
          </li>
          <li className="px-7 py-3 w-full text-start text-4xl">
            <Link to="/teamIntro?tab12" onClick={closeNav}>
              TEAM
            </Link>
          </li>
          <li className="px-7 py-3 w-full text-start text-4xl">
            <Link to="/contact" onClick={closeNav}>
              CONTACT
            </Link>
          </li>
          <li className="px-7 py-3 w-full text-start text-4xl">
            <Link to="/cybercampus/intro" onClick={closeNav}>
              CYBERCAMPUS
            </Link>
          </li>

          <div className="mt-10">
            {isLoggedIn ? (
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div
                    style={{ backgroundColor: info.color }}
                    className={`flex items-center justify-center w-[30px] h-[30px] rounded-[50%]`}
                  >
                    🦁
                  </div>
                  <span className="text-xs px-2">{info.track}</span>
                  <span className="font-bold">{info.name}님</span>
                </div>
                <div className="px-2 text-[gray]">|</div>
                <button onClick={handleLogout} className="text-xs">
                  LOGOUT
                </button>
              </div>
            ) : (
              <GoogleLoginBtn />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

const MobileNav = ({ isAdminOrCyberCampusPage }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, setIsOpen } = useNavbar();
  const [scrolling, setScrolling] = useState(false);

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <div
        className={`top-0 mobileNavbar fontEB fixed z-10 w-full mx-auto text-white transition-all duration-300`}
      >
        <div
          className={`Navbar flex justify-between p-5 ${
            isScrolled ? "backdrop-blur-md" : ""
          } ${scrolling && !isOpen ? "nav-bg-scrolled" : ""}`}
        >
          <Link
            to="/"
            onClick={() => {
              onTop();
            }}
          >
            <div className="flex items-center">
              <img
                className={`w-20 ${isOpen ? "opacity-0" : "opacity-100"}`}
                src={images.likelion_logo}
                alt="likelion_logo"
              />
            </div>
          </Link>

          <div
            className={`off-screen-menu ${
              isOpen ? "open slideInDown fixed" : "hidden"
            } ${
              isAdminOrCyberCampusPage
                ? "bg-white text-black"
                : "bg-black text-white"
            } flex justify-center tracking-[1px] `}
          >
            {isOpen && <ShowNav />}
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`mr-1 hamburger-menu ${
                isOpen ? "active" : ""
              } cursor-pointer z-20`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={`ham-bar bar-top ${
                  isAdminOrCyberCampusPage ? "bg-black" : "bg-white"
                } `}
              />
              <div
                className={`ham-bar bar-mid ${
                  isAdminOrCyberCampusPage ? "bg-black" : "bg-white"
                }`}
              />
              <div
                className={`ham-bar bar-bottom ${
                  isAdminOrCyberCampusPage ? "bg-black" : "bg-white"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
