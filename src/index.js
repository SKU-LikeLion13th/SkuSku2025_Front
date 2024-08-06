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
          onScriptLoadError={() => console.log("failed")}
          onScriptLoadSuccess={() => console.log("success")}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);