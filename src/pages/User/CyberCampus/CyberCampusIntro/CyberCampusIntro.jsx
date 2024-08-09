import React from 'react';
import { useLogin } from '../../../../utils/LoginContext';
import NeedLogin from './NeedLogin';
import CyberCampusMain from './CyberCampusMain';

const CyberCampusIntro = () => {
  const { isLoggedIn } = useLogin();

  return <div>{isLoggedIn ? <CyberCampusMain /> : <NeedLogin />}</div>;
};

export default CyberCampusIntro;