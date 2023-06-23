import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/common/globalstyles';
import { Tooltip } from 'react-tooltip';
import './styles/font-settings.css';

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import DashboardLayout from './routes/DashboardLayout';
import Overview from './routes/Overview';
import Stats from './routes/Stats';

import { registerSW } from 'virtual:pwa-register';

import AppData from './storage/data';

const VERSION = '0.0.1';
AppData.set('etc.version', VERSION);
// XXX VERSION 파일 삭제 논의

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready for offline mode.');
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'stats', element: <Stats /> },
      { path: 'world', element: <Overview /> },
      { path: 'player', element: <Overview /> },
      { path: 'traffic', element: <Overview /> },
      { path: 'console', element: <Overview /> }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: '/settings',
    element: <Root />,
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
    <Tooltip id='dashify__tooltip' place='bottom' />
  </React.StrictMode>
);

updateSW();
