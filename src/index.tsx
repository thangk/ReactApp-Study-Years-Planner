// import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import './styles/globals.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const app = (
  <StrictMode>      
      <App />
  </StrictMode>
);

root.render(app);

reportWebVitals();