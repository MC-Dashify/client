import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/common/globalstyles';
import './styles/font-settings.css';

import Overview from './routes/Overview';
import DashboardLayout from './routes/DashboardLayout';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready for offline mode');
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
      { path: 'stats', element: <Overview /> },
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
  </React.StrictMode>
);

updateSW();
