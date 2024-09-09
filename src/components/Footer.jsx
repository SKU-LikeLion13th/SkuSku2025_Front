import React from "react";
import { images } from "../utils/images";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className="leading-7 container w-11/12 mx-auto border-t-[1px] border-[#626262] py-12 px-12 h-64">
        <div className="flex flex-col mb-10">
          <span className="text-2xl fontBlack text-[#3B79FF]">
            LIKELION SKU
          </span>
          <span className="fontLight">
            주소 : 경기도 안양시 만안구 성결대학로 53
          </span>
          <span className="flex items-center fontLight">
            <IoIosMail className="mr-1" size={20} />
            문의처 sungkyul.univ@likelion.org
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <Link to="https://www.instagram.com/likelion_sku/" target="_blank">
              <img src={images.insta} alt="insta" className="mx-1" />
            </Link>
            <Link to="http://pf.kakao.com/_vxixlaxj" target="_blank">
              <img src={images.kakao} alt="kakao" className="mx-1" />
            </Link>
          </div>
          <div className="fontSB">
            @2024_LIKEL
            <Link to="/admin/main" className="cursor-auto">
              IO
            </Link>
            NSKU 12th
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
