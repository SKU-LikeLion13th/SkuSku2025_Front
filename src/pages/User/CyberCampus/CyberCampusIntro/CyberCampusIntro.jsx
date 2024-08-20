import React from 'react';
import { useLogin } from '../../../../utils/LoginContext';
import NeedLogin from './NeedLogin';
import CyberCampusMainNew from './CyberCampusMainNew';

const CyberCampusIntro = () => {
  const { isLoggedIn } = useLogin();

  return <div>{isLoggedIn ? <CyberCampusMainNew /> : <NeedLogin />}</div>;
};

export default CyberCampusIntro;