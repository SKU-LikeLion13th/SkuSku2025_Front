import { Link, useLocation } from "react-router-dom";
import { images } from "../utils/images";
import { SlHome } from "react-icons/sl"
import { useEffect, useState } from "react";
import '../css/nav.css';
import { useNavbar } from "../utils/navbar-context";
// import { getToken } from "../utils/Auth";

const ShowNav = () => {
    const { setIsOpen } = useNavbar();
    // const ACCESS_TOKEN = getToken();
    const closeNav = () => {
        setIsOpen(false)
    }

    // const Login = () => {
    //     localStorage.setItem('last', window.location.href)
    //     window.location.href = 'https://wave-renew.sku-sku.com:8000/login';
    // }
    // const LogOut = () => {
    //     localStorage.removeItem('token');
    //     window.location.reload();
    // }

    return (
        <div className="Navbar flex min-h-screen overflow-y-auto">
            <div className="flex flex-col items-center justify-center">
                <ul className="NanumSquareEB flex flex-col items-center justify-center gap-y-6 text-2xl">
                    <li className="px-7 w-full text-center text-4xl"><Link to="/frontend" onClick={closeNav}>TRACK</Link></li>
                    <ul className="flex items-center">
                      <li className="fontThin px-7 w-full text-center text-md"><Link to="/frontend" onClick={closeNav}>FRONTEND</Link></li>
                      <li className="fontThin px-7 w-full text-center text-md"><Link to="/backend" onClick={closeNav}>BACKEND</Link></li>
                      <li className="fontThin px-7 w-full text-center text-md"><Link to="/pm_design" onClick={closeNav}>PM & DESIGN</Link></li>
                    </ul>
                    <li className="px-7 py-3 w-full text-center text-4xl"><Link to="/project" onClick={closeNav}>PROJECT</Link></li>
                    <li className="px-7 py-3 w-full text-center text-4xl"><Link to="/teamIntro" onClick={closeNav}>TEAM</Link></li>
                    <li className="px-7 py-3 w-full text-center text-4xl"><Link to="/contact" onClick={closeNav}>CONTACT</Link></li>
                    {/* {ACCESS_TOKEN ?
                        <>
                            <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/mypage" onClick={closeNav}>정보수정</Link></li>
                            <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link onClick={LogOut}>로그아웃</Link></li>
                        </> :
                        <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link onClick={Login}>로그인</Link></li>
                    } */}
                </ul>
            </div>
        </div>
    )
}

const MobileNav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isOpen, setIsOpen } = useNavbar();
    const [scrolling, setScrolling] = useState(false)

    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
        <div className={`top-0 mobileNavbar fontEB fixed z-10 w-full mx-auto text-white transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
          <div className={`Navbar flex justify-between p-5 ${scrolling && !isOpen ? 'nav-bg-scrolled' : ''}`}>
              <Link to='/' onClick={() => { onTop() }}>
                <div className="flex items-center">
                  <img className={`w-20 ${isOpen ? 'opacity-0' : 'opacity-100'}`} src={images.likelion_logo} alt="likelion_logo" />
                </div>
              </Link>

              <div className={`off-screen-menu ${isOpen ? 'open slideInDown fixed' : 'hidden'} flex justify-center tracking-[1px] bg-black`}>
                  {isOpen && (
                      <ShowNav />
                  )}
              </div>

              <div className="flex items-center space-x-2">
                <div className={`mr-1 hamburger-menu ${isOpen ? 'active' : ''} cursor-pointer z-20`} onClick={() => setIsOpen(!isOpen)}>
                    <div className="ham-bar bar-top bg-white" />
                    <div className="ham-bar bar-mid bg-white" />
                    <div className="ham-bar bar-bottom bg-white" />
                </div>
              </div>
          </div>
        </div>
        </>
    )
}

export default MobileNav;