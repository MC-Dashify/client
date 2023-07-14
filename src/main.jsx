import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Toaster, toast } from 'react-hot-toast';
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
// import { registerSW } from 'virtual:pwa-register';

import App from './App';

import AppData from './storage/data';
import GlobalStyle, {
  defaultFontFamily
} from './components/common/globalstyles';
import './styles/font-settings.css';
import { RecoilRoot } from 'recoil';
import { window as tauriWindow } from '@tauri-apps/api';
import { TauriEvent } from '@tauri-apps/api/event';
import { Store } from 'tauri-plugin-store-api';

const store = new Store('dashify.dat');

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
chartDefaults.animation.duration = 0; // general animation time
chartDefaults.animations.x = false; // disables all animations
chartDefaults.animations.y = false; // disables all animations
chartDefaults.transitions.active.animation.duration = 0; // disables the animation for 'active' mode

const VERSION = '0.0.1';
AppData.set('etc.version', VERSION);
// XXX VERSION 파일 삭제 논의

const root = ReactDOM.createRoot(document.getElementById('root'));

const components = (
  <React.StrictMode>
    <GlobalStyle />

    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
    <ReactTooltip id='dashify__tooltip' place='bottom' />
    <Toaster position='bottom-center' style={{ zIndex: '20' }} />
  </React.StrictMode>
);
const { hostname, port } = window.location;

if (!(hostname === 'localhost' && port === '5173')) {
  tauriWindow
    .getCurrent()
    .listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async () => {
      toast.loading('데이터 저장중...', { id: 'saving' });
      Object.keys(localStorage).forEach(async (key) => {
        await store.set(key, localStorage.getItem(key));
      });
      await store.save().then(() => {
        localStorage.clear();
      });
      toast.dismiss('saving');
      tauriWindow.getCurrent().close();
    });

  store
    .keys()
    .then((keys) => {
      keys.forEach(async (key) => {
        const value = await store.get(key);
        localStorage.setItem(key, value);
      });
    })
    .then(() => {
      root.render(components);
    });
} else {
  root.render(components);
}
