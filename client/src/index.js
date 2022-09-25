// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from './components/Common/ScrollTop';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import reset from './styles/reset';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <Global styles={reset} />
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);
