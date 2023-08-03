import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';

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

  console.log(themeState)

  return (
    <ThemeProvider theme={themeState === 'dark' ? dark : light}>
      <GlobalStyle />

      <Routes location={background || location}>
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
      </Routes>

      {background && (
        <Routes>
          <Route path='/settings' element={<Settings install={install} />} />
        </Routes>
      )}

      <Update silent={true} />
    </ThemeProvider>
  );
};

export default App;
