import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
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
    toast(
      '오프라인 준비를 완료했습니다. 이제 오프라인 상태에서도 애플리케이션을 사용할 수 있습니다.',
      {
        id: 'offline-ready',
        duration: 4000
      }
    );
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />} errorElement={<ErrorPage />} />

      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Overview />} />
          <Route path='stats' element={<Stats />} />
          <Route path='world' element={<Worlds />} />
          <Route path='player' element={<Players />} />
          <Route path='traffic' element={<Traffic />} />
          <Route path='console' element={<Console />} />
        </Route>
      </Route>

      <Route path='/settings' />
    </>
  )
);

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
