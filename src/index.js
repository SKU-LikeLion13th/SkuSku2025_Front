import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
<<<<<<< Updated upstream
          onScriptLoadError={() => console.log("failed")}
          onScriptLoadSuccess={() => console.log("success")}>
=======
              onScriptLoadError={() => console.log("실패")}
              onScriptLoadSuccess={() => console.log("성공")}>
>>>>>>> Stashed changes
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
