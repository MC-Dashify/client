import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { toast, Toaster } from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
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
import Worlds from './routes/Worlds';
import Players from './routes/Players';
import Traffic from './routes/Traffic';
import Console from './routes/Console';

import AppData from './storage/data';
import GlobalStyle, {
  defaultFontFamily
} from './components/common/globalstyles';
import './styles/font-settings.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
chartDefaults.font.family = defaultFontFamily;
chartDefaults.font.size = 16;

const VERSION = '0.0.1';
AppData.set('etc.version', VERSION);
// XXX VERSION 파일 삭제 논의

const updateSW = registerSW({
  onOfflineReady() {
    toast('네트워크 연결이 끊겨 오프라인 모드 준비를 완료했습니다.', {
      id: 'offline-ready',
      duration: 4000
    });
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
      { path: 'world', element: <Worlds /> },
      { path: 'player', element: <Players /> },
      { path: 'traffic', element: <Traffic /> },
      { path: 'console', element: <Console /> }
    ],
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalStyle />

    <RouterProvider router={router} />

    <ReactTooltip id='dashify__tooltip' place='bottom' />
    <Toaster position='bottom-center' />
  </React.StrictMode>
);

updateSW();
