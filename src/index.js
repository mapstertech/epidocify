import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { XMLProvider } from './contexts/XMLContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <XMLProvider>
      <App />
    </XMLProvider>
  </React.StrictMode>
);
