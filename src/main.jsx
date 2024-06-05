import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { store } from './store/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);