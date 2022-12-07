import 'animate.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/boxicons-2.1.1/css/boxicons.min.css';
import reportWebVitals from './reportWebVitals';
import './sass/index.scss';
import 'animate.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
