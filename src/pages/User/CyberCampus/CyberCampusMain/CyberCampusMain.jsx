import React from 'react';
import { useLogin } from '../../../../utils/LoginContext';
import NeedLogin from './NeedLogin';

const CyberCampusMain = () => {
  const { isLoggedIn } = useLogin();

  return (
    <div className='text-white'>
    {isLoggedIn ? '로그인 완료' : <NeedLogin /> }
    </div>
  )
};

export default CyberCampusMain;
