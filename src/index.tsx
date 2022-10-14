import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import configureStore from './store';

import './index.scss';

const store = configureStore();

const root = ReactDOM.createRoot(
  document.querySelector('#main-react') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
