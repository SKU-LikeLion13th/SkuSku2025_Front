import React from 'react';
import { useLogin } from '../../../../utils/LoginContext';

const CyberCampusMain = () => {
  const { isLoggedIn } = useLogin();

  return (
    <div className='text-white'>
    {isLoggedIn ? '로그인 완료' : '로그인 해야합니다.'}
    </div>
  )
};

export default CyberCampusMain;
