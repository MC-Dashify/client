import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import * as Sentry from '@sentry/react';

import { themeState as _themeState } from './contexts/states';
import { dark, light } from './styles/themes';
import Theme from './storage/theme';
import GlobalStyle from './components/common/globalstyles';

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import DashboardLayout from './routes/DashboardLayout';
import Overview from './routes/Overview';
import Stats from './routes/Stats';
import Worlds from './routes/Worlds';
import Players from './routes/Players';
import Traffic from './routes/Traffic';
import Console from './routes/Console';
import Settings from './routes/Settings';
import InstallPWA from './hooks/pwa';
import Update from './routes/Update';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const install = InstallPWA();

  const [themeState, setThemeState] = useRecoilState(_themeState);

  useEffect(() => {
    const theme = Theme.get();
    if (theme === 'auto' && window.matchMedia) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(isDark ? 'dark' : 'light');
    } else {
      setThemeState(theme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeState]);

  return (
    <ThemeProvider theme={themeState === 'dark' ? dark : light}>
      <GlobalStyle />

      <SentryRoutes location={background || location}>
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

        <Route path='/settings' element={<Settings install={install} />} />
      </SentryRoutes>

      {background && (
        <SentryRoutes>
          <Route path='/settings' element={<Settings install={install} />} />
        </SentryRoutes>
      )}

      <Update silent={true} />
    </ThemeProvider>
  );
};

export default App;
