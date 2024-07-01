import React, { useEffect, useState } from 'react'
import { images } from '../utils/images';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [track, setTrack] = useState();

  useEffect(()=> {
    setTrack(location.pathname);
  }, [location])

  return (
    <>
    {/* 트랙 페이지일 때만 보임 */}
    {(track === '/frontend' || track === '/backend' || track === '/pm_design') &&
      <div className='flex justify-end container mx-auto'>
        <div>
        {track !== '/frontend' && <Link to='/frontend'><div className='text-[#FF7816]'>FRONT-END ⮕</div></Link>}
        {track !== '/backend' && <Link to='/backend'><div className='text-[#47EAEA]'>BACK-END ⮕</div></Link>}
        {track !== '/pm_design' && <Link to='/pm_design'><div className='text-[#FF669D]'>PM/DESIGN ⮕</div></Link>}
        </div>
      </div>
    }

    <div className='leading-7 container mx-auto border-t-[1px] border-[#626262] py-12 mt-16'>
      <div className='flex flex-col mb-10'>
        <span className='text-2xl font-bold text-[#3B79FF]'>SKU LIKELION</span>
        <span>주소 : 경기도 안양시 만안구 성결대학로 53</span>
        <span className='flex items-center'>
          <img src={images.email} alt="email" className='mr-1' />
          문의처 sungkyul.univ@likelion.org
        </span>
      </div>
    
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Link to='https://www.instagram.com/likelion_sku/' target='_blank'><img src={images.insta} alt="insta" className='mx-1'/></Link>
          <Link to='http://pf.kakao.com/_vxixlaxj' target='_blank'><img src={images.kakao} alt="kakao" className='mx-1'/></Link>
        </div>
        <div>@2024_SKULIKELION 12th</div>
      </div>
    </div>
    </>
  );
};

export default Footer;