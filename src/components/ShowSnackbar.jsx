import * as React from 'react';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';

export default function PositionedSnackbar({ name, showSnack, setShowSnack }) {
  const handleClose = React.useCallback(() => {
    setShowSnack(false); // Snackbar를 수동으로 닫을 때도 부모 컴포넌트의 상태 업데이트
  }, [setShowSnack]);

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnack} // Snackbar의 열림/닫힘 상태를 showSnack으로 제어
        onClose={handleClose}
        key='top-center'
        autoHideDuration={2000} // 2초 후 자동으로 닫힘
      >
        성결대학교 이메일로 로그인 해주세요.
      </Snackbar>
    </Box>
  );
}
