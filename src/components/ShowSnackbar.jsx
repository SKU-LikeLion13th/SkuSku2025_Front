import * as React from "react";
import Box from "@mui/joy/Box";
import Snackbar from "@mui/joy/Snackbar";
import { useLogin } from "../utils/LoginContext";

const ShowSnackbar = () => {
  const { showSnack, setShowSnack } = useLogin();

  const handleClose = () => {
    setShowSnack(false);
  };

  return (
    <Box>
      <Snackbar
        size="md"
        color="danger"
        variant="outlined"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnack.open} // Snackbar의 열림/닫힘 상태를 showSnack으로 제어
        onClose={handleClose}
        key="top-center"
        autoHideDuration={2000} // 2초 후 자동으로 닫힘
      >
        {showSnack.state === "session" ? (
          <>세션이 만료되었습니다. 재로그인 해주세요.</>
        ) : (
          <>성결대학교 이메일로 로그인 해주세요.</>
        )}
      </Snackbar>
    </Box>
  );
};

export default ShowSnackbar;
