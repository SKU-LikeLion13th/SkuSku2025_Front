import React from 'react';
import { useLogin } from '../../../../utils/LoginContext';
import NeedLogin from '../CyberCampusMain/NeedLogin';
import CyberCampusMain from './CyberCampusIntro';

const CyberCampusIntro = () => {
  const { isLoggedIn } = useLogin();

  return <div>{isLoggedIn ? <CyberCampusMain /> : <NeedLogin />}</div>;
};

export default CyberCampusIntro;
