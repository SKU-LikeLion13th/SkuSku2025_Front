import React from 'react';
import GoogleLoginBtn from '../../../../components/GoogleLoginBtn';

const NeedLogin = () => {
  return (
    <div className='container mx-auto text-center flex flex-col items-center justify-center h-[70vh] mt-16'>
      <div className='flex flex-col'>
        <div className='text-5xl fontEB'>소셜 로그인</div>
        <div className='py-10 text-xl'>
          성결대학교 아기사자들을 위한 학습 공간입니다.<br/>
          <span className='font-bold'>로그인 후 서비스 이용이 가능합니다.</span>
        </div>
        <div className='mx-auto text-center'>
          <GoogleLoginBtn size={'large'} width={'400'} type={'standard'} shape={'rectangular'} />
        </div>
      </div>
    </div>
  );
};

export default NeedLogin;