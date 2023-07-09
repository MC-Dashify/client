import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';

import { Logo, LogoText } from '../assets/logo';
import {
  ChartIcon,
  ServerIcon,
  EarthIcon,
  PeopleIcon,
  ConsoleIcon,
  TopBottomArrowIcon,
  CogIcon
} from '../assets/24x-icons';
import { ArrowRightAndLeftIcon } from '../assets/16x-icons';
import DashboardPageTitle from '../components/dashboard/DashboardPageTitle';
import { RecoilRoot, useRecoilState } from 'recoil';
import { useInterval } from '../hooks/interval';
import { testState } from '../contexts/states';
import Network from '../utils/net';
import AppData from '../storage/data';

const Aside = styled.aside`
  display: flex;
  z-index: 0;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 18px;
  gap: 4px;
  height: 100%;
  width: 260px;
  background: #f9f9f9;
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
  color: #000;
  font-weight: 500;
  font-size: 18px;
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
    background: linear-gradient(92.51deg, #3b86f8 0%, #87b7ff 100%);
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

const AsidePageMenu = ({ to, label, icon, ...props }) => {
  const location = useLocation();

  return (
    <AsideMenuLink to={to} $activated={location.pathname === to} {...props}>
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
  background: #e1edff;
  border-radius: 14px;
  line-height: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0, 0.2, 0.3, 0.95);

  svg {
    color: #2255a1;
    width: 16px;
    height: 16px;
  }

  &:hover,
  &:focus-visible {
    background-color: #d9e4f5;
  }

  &:active {
    background-color: #c9d7eb;
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
  color: #6594cb;
  font-size: 12px;
`;

const ProfileChanger = () => {
  return (
    <ProfileChangerBox>
      <ProfileInfoContainer>
        <ProfileTitle>하이픽셀하이픽셀하이픽셀하이픽셀</ProfileTitle>
        <ProfileAddress>hypixel.nethypixel.nethypixel.net:25555</ProfileAddress>
      </ProfileInfoContainer>

      <ArrowRightAndLeftIcon />
    </ProfileChangerBox>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const [test, setTest] = useRecoilState(testState);

  // 백그라운드에서 일정 시간마다 작업 실행
  useInterval(async () => {
    fetch(`${AppData.get('test.address')}/ping`, {
      method: 'GET',
      mode: 'no-cors'
    }).then((res) => {
      console.log(res);
    });

    console.log(test);
    setTest(test + 1);
  }, 1000);

  const menus = [
    { path: '/dashboard', label: '대시보드', icon: <ChartIcon /> },
    { path: '/dashboard/stats', label: '서버 상태', icon: <ServerIcon /> },
    { path: '/dashboard/world', label: '월드', icon: <EarthIcon /> },
    { path: '/dashboard/player', label: '플레이어', icon: <PeopleIcon /> },
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
            <Logo background='black' foreground='white' />
            <LogoText color='black' />
          </AsideLogoContainer>
        </Link>
        <AsideMenuContainer>
          {menus.map((menu, index) => (
            <AsidePageMenu
              to={menu.path}
              label={menu.label}
              icon={menu.icon}
              key={`aside-menu-${index}`}
            />
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

const DashboardLayout = () => {
  const [refreshFn, setRefreshFn] = useState(null);
  // Outlet -> DashboardLayout로 새로 고침 함수를 전달해야 합니다

  return (
    <PageContentContainer>
      <RecoilRoot>
        <Sidebar />
        <OutletContainer>
          <DashboardPageTitle refreshFn={refreshFn} />
          <Outlet context={[refreshFn, setRefreshFn]} />
        </OutletContainer>{' '}
      </RecoilRoot>
    </PageContentContainer>
  );
};

export default DashboardLayout;
