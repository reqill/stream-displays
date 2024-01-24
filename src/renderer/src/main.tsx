import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import Screen from './Screen';
import Screens from './Screens';
import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/screens" element={<Screens />}>
            <Route path=":screenId" element={<Screen />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
);
