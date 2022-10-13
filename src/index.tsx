import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './router';

import './index.scss';

const root = ReactDOM.createRoot(
  document.querySelector('#main-react') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

reportWebVitals();
