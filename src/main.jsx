import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults as chartDefaults
} from 'chart.js';
import { registerSW } from 'virtual:pwa-register';

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import DashboardLayout from './routes/DashboardLayout';
import Overview from './routes/Overview';
import Stats from './routes/Stats';
import AppData from './storage/data';
import GlobalStyle, {
  defaultFontFamily
} from './components/common/globalstyles';
import './styles/font-settings.css';

ChartJS.register(ArcElement, Tooltip, Legend);
chartDefaults.font.family = defaultFontFamily;
chartDefaults.font.size = 16;

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
    <ReactTooltip id='dashify__tooltip' place='bottom' />
  </React.StrictMode>
);

updateSW();
