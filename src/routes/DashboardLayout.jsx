import { useEffect, useState, useCallback, useContext } from 'react';
import { Outlet, Link, useLocation, BrowserRouter } from 'react-router-dom';
import { css, styled, ThemeContext } from 'styled-components';

import { Logo, LogoText } from '../assets/logo';
import {
  ChartIcon,
  ServerIcon,
  EarthIcon,
  PeopleIcon,
  HammerIcon,
  ConsoleIcon,
  TopBottomArrowIcon,
  CogIcon,
  FolderIcon
} from '../assets/24x-icons';
import { ArrowRightAndLeftIcon } from '../assets/16x-icons';
import DashboardPageTitle from '../components/dashboard/DashboardPageTitle';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import { useInterval } from '../hooks/interval';
import {
  currentProfileState,
  hideAddressState,
  refreshRateState,
  statsState,
  worldsState,
  playersState,
  trafficState,
  banListState
} from '../contexts/states';
import AppData from '../storage/data';
import Profile from '../storage/profile';
import { showModal } from '../utils/modal';
import ProfileList from '../components/common/ProfileList';
import { Toaster, toast } from 'react-hot-toast';
import {
  getBanList,
  getPlayers,
  getStatus,
  getTraffic,
  getWorlds,
  ping
} from '../utils/data';

const Aside = styled.aside`
  display: flex;
  z-index: 0;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 18px;
  gap: 4px;
  height: 100%;
  width: 260px;
  background: ${({ theme }) => theme.aside.bg};
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
`;

const AsideTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const AsideLogoContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const AsideMenuContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

const AsideMenuLink = styled(Link)`
  --transition-duration: 0.2s;
  --transition-timing-function: cubic-bezier(0, 0.2, 0.3, 0.95);

  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  line-height: 100%;
  border-radius: 14px;
  transition: all var(--transition-duration) var(--transition-timing-function);
  box-shadow: 0 0 0 rgba(0, 68, 169, 0);
  transition-property: background-color, box-shadow;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  svg,
  span {
    transition: all var(--transition-duration) var(--transition-timing-function);
    transition-property: font-weight, filter;
    /* property에 color가 없는 건 의도입니다 */
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 100%
      ),
      ${({ theme }) => theme.aside.link};
    background-blend-mode: overlay, normal;
    opacity: 0;
    transition: opacity 0.4s var(--transition-timing-function);
  }

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${({ $activated }) =>
    $activated &&
    css`
      font-weight: 700;
      box-shadow: 0 0 24px rgba(0, 68, 169, 0.25);

      svg,
      span {
        color: white;
        filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.4));
      }

      &::before {
        opacity: 1;
      }
    `}
`;

const AsidePageMenu = ({ path, label, icon, checkByStartWith, ...props }) => {
  const location = useLocation();

  return (
    <AsideMenuLink
      to={path}
      $activated={
        checkByStartWith
          ? location.pathname.startsWith(path)
          : location.pathname === path
      }
      {...props}
    >
      {icon}
      <span>{label}</span>
    </AsideMenuLink>
  );
};

const AsideBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileChangerBox = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  width: 100%;
  color: ${({ theme }) => theme.aside.profile.text};
  background: ${({ theme }) => theme.aside.profile.bg};
  border-radius: 14px;
  line-height: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0, 0.2, 0.3, 0.95);

  svg {
    color: ${({ theme }) => theme.aside.profile.icon};
    width: 16px;
    height: 16px;
  }

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.02); // TODO: theme
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.05); // TODO: theme
  }
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  width: 0;
  user-select: none;
`;

const ProfileTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
`;

const ProfileAddress = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.aside.profile.address};
  font-size: 12px;
`;

const ProfileChanger = () => {
  const currentProfile = useRecoilValue(currentProfileState);
  const hideAddress = useRecoilValue(hideAddressState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const theme = useContext(ThemeContext);

  return (
    <ProfileChangerBox
      onClick={() => {
        showModal(
          <RecoilBridge>
            <BrowserRouter>
              <ProfileList theme={theme} />
            </BrowserRouter>
          </RecoilBridge>,
          484,
          {
            showCloseButton: false,
            background: theme.modal.bg,
            color: theme.modal.text
          }
        );
      }}
    >
      <ProfileInfoContainer>
        <ProfileTitle>{currentProfile.name}</ProfileTitle>
        {!hideAddress && (
          <ProfileAddress>{`${currentProfile.address}:${currentProfile.port}`}</ProfileAddress>
        )}
      </ProfileInfoContainer>

      <ArrowRightAndLeftIcon />
    </ProfileChangerBox>
  );
};

const Sidebar = (props) => {
  const theme = useContext(ThemeContext);
  const location = useLocation();

  const menus = [
    { path: '/dashboard', label: '대시보드', icon: <ChartIcon /> },
    { path: '/dashboard/stats', label: '서버 상태', icon: <ServerIcon /> },
    { path: '/dashboard/world', label: '월드', icon: <EarthIcon /> },
    { path: '/dashboard/player', label: '플레이어', icon: <PeopleIcon /> },
    { path: '/dashboard/banlist', label: '밴 목록', icon: <HammerIcon /> },
    {
      path: '/dashboard/files',
      label: '파일 관리',
      icon: <FolderIcon />,
      checkByStartWith: true
    },
    {
      path: '/dashboard/traffic',
      label: '트래픽 (αlpha)',
      icon: <TopBottomArrowIcon />
    },
    { path: '/dashboard/console', label: '콘솔 / 로그', icon: <ConsoleIcon /> }
  ];

  return (
    <Aside>
      <AsideTopContainer>
        <Link to='/'>
          <AsideLogoContainer>
            <Logo
              background={theme.aside.logo.bg}
              foreground={theme.aside.logo.fg}
            />
            <LogoText color={theme.aside.logo.text} />
          </AsideLogoContainer>
        </Link>
        <AsideMenuContainer>
          {menus.map((menu, index) => (
            <AsidePageMenu {...menu} key={`aside-menu-${index}`} />
          ))}
        </AsideMenuContainer>
      </AsideTopContainer>

      <AsideBottomContainer>
        <ProfileChanger />

        <AsidePageMenu
          to='/settings'
          label='설정'
          icon={<CogIcon />}
          state={{ background: location }}
        />
      </AsideBottomContainer>
    </Aside>
  );
};

const PageContentContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 42px;
  height: 100%;
  overflow: auto;
`;

const UnconnectedDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 64px;
  font-weight: 700;

  padding-top: 64px;
`;

const DashboardLayout = () => {
  const [refreshFn, setRefreshFn] = useState(null);
  const [connected, setConnected] = useState(false);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);
  // Outlet -> DashboardLayout로 새로 고침 함수를 전달해야 합니다

  const [refreshRate, setRefreshRate] = useRecoilState(refreshRateState);
  const [currentProfile, setCurrentProfile] =
    useRecoilState(currentProfileState);
  const setStats = useSetRecoilState(statsState);
  const setWorlds = useSetRecoilState(worldsState);
  const setPlayers = useSetRecoilState(playersState);
  const setBanList = useSetRecoilState(banListState);
  const setTraffic = useSetRecoilState(trafficState);

  const location = useLocation();

  const reloadTask = useCallback(
    async (profile = currentProfile) => {
      try {
        if (!profile?.address) return;
        await ping(profile);

        // TODO: 개선 필요
        if (
          !firstLoadComplete ||
          location.pathname === '/dashboard' ||
          location.pathname === '/dashboard/stats'
        ) {
          const statResults = await getStatus(profile);
          setStats((stats) => [...stats.slice(-19), statResults]);
        }

        if (
          !firstLoadComplete ||
          location.pathname === '/dashboard' ||
          location.pathname === '/dashboard/world'
        ) {
          const worlds = await getWorlds(profile);
          setWorlds(worlds);
        }

        if (!firstLoadComplete || location.pathname === '/dashboard/player') {
          const players = await getPlayers(profile);
          setPlayers(players);
        }

        if (!firstLoadComplete || location.pathname === '/dashboard/banlist') {
          const players = await getBanList(profile);
          setBanList(players);
        }

        if (location.pathname === '/dashboard/traffic') {
          const trafficData = await getTraffic(profile);
          setTraffic((traffic) => [...traffic.slice(-19), trafficData]);
        }

        setConnected(true);

        if (firstLoadComplete === false) {
          setFirstLoadComplete(true);
        }
      } catch (e) {
        console.error(e);
        setConnected(false);
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProfile, firstLoadComplete, location]
  );

  useEffect(() => {
    if (firstLoadComplete === false) {
      toast.loading('데이터 로드중...', { id: 'data-loading' });
    } else if (firstLoadComplete === true) {
      toast.dismiss('data-loading');
    }
  }, [firstLoadComplete]);

  useEffect(() => {
    if (currentProfile.uuid === undefined) {
      const profile = Profile.get(AppData.get('etc.last_profile'));
      setCurrentProfile(profile);
    }
    if (currentProfile && !connected) {
      reloadTask(currentProfile);
    }
  }, [
    currentProfile,
    setCurrentProfile,
    connected,
    reloadTask,
    firstLoadComplete
  ]);

  useEffect(() => {
    setRefreshRate(AppData.get('settings.auto_refresh_rate'));
  }, [setRefreshRate]);

  // 백그라운드에서 일정 시간마다 작업 실행
  useInterval(reloadTask, refreshRate);

  return (
    <PageContentContainer>
      <Sidebar
        setConnected={setConnected}
        connected={connected}
        refreshFn={refreshFn}
      />
      <OutletContainer>
        <DashboardPageTitle reloadTask={reloadTask} refreshFn={refreshFn} />

        {connected ? (
          <Outlet context={[refreshFn, setRefreshFn]} />
        ) : (
          <UnconnectedDisplay>
            서버랑 연결이 되어 있지 않습니다
          </UnconnectedDisplay>
        )}
      </OutletContainer>
    </PageContentContainer>
  );
};

export default DashboardLayout;
