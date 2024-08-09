import React from 'react';
import GoogleLoginBtn from '../../../../components/GoogleLoginBtn';

const NeedLogin = () => {
  return (
    <div className='container mx-auto text-center flex flex-col items-center justify-center h-[60vh]'>
      <div className='flex flex-col'>
        <div className='text-3xl font-bold'>소셜 로그인</div>
        <div className='py-10'>
          성결대학교 아기사자들을 위한 학습 공간입니다.<br/>
          <span className='font-bold'>로그인 후 서비스 이용이 가능합니다.</span>
        </div>
        <div className='mx-auto text-center'>
          <GoogleLoginBtn size={'300px'} type={'standard'} shape={'rectangular'} />
        </div>
      </div>
    </div>
  );
};

export default NeedLogin;