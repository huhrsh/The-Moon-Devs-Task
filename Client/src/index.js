import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReduxProvider } from './redux/provider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
      <ToastContainer autoClose="2000"/>
    </ReduxProvider>
  </React.StrictMode>
);
