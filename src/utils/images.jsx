const PATH = process.env.PUBLIC_URL;

export const images = {
  arrow: `${PATH}/assets/arrow.png`,
  // logo
  likelion_logo: PATH + 'assets/images/logo.png',

  //main
  mainImages: [
    { id: 1, src: `${PATH}/assets/images/main/main1.png`, alt: '메인 이미지 1' },
    { id: 2, src: `${PATH}/assets/images/main/main2.png`, alt: '메인 이미지 2' },
    { id: 3, src: `${PATH}/assets/images/main/main3.png`, alt: '메인 이미지 3' },
  ],
  mouse: PATH + 'assets/images/main/mouse.png',
  mainP2 : PATH + 'assets/images/main/mainP2.png',
  icon1: PATH + 'assets/images/main/icon1.png',
  icon2: PATH + 'assets/images/main/icon2.png',
  icon3: PATH + 'assets/images/main/icon3.png',
  likelion: PATH + 'assets/images/main/likelion.png',
  schedule: PATH + 'assets/images/main/schedule.png',

  // track
  track_frontend_background: PATH + 'assets/images/track/frontend_background.png',
  track_backend_background: PATH + 'assets/images/track/backend_background.png',
  track_pm_background: PATH + 'assets/images/track/pm_background.png',
  track_frontend_curri: PATH + 'assets/images/track/frontLine.png',
  track_backend_curri: PATH + 'assets/images/track/backLine.png',
  track_pm_curri: PATH + 'assets/images/track/pmLine.png',

  // footer
  insta: PATH + 'assets/images/footer/insta.png',
  kakao: PATH + 'assets/images/footer/kakao.png',
  email: PATH + 'assets/images/footer/email.png',
};
