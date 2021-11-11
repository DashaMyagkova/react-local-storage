import React from 'react';
import Router from '@router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './store/config';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Provider store={store}>
    <Router />
    <ToastContainer
      position="top-right"
      hideProgressBar
      autoClose="1500"
      closeOnClick
      draggable
    />
  </Provider>
);

export default App;
