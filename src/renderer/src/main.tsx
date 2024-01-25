import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
