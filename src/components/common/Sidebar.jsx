import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Aside = styled.aside`  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  padding: 32px 18px;
`;

const MenuLink = ({ to, label, icon }) => {
  return (
    <Link to={to}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const menus = [
    { path: '/dashboard', label: 'Dashboard', icon: null },
    { path: '/dashboard/stats', label: 'Server Status', icon: null },
    { path: '/dashboard/world', label: 'World', icon: null },
    { path: '/dashboard/player', label: 'Player', icon: null },
    { path: '/dashboard/traffic', label: 'Traffic', icon: null },
    { path: '/dashboard/console', label: 'Console', icon: null },
    { path: '/dashboard/settings', label: 'Settings', icon: null }
  ];

  return (
    <Aside>
      <div>
        <img src='/logo.svg' alt='Dashify Logo' />
        <span>Dashify</span>
      </div>

      <div>
        {menus.map((menu, index) => (
          <MenuLink
            to={menu.path}
            label={menu.label}
            icon={menu.icon}
            key={`aside-menu-${index}`}
          />
        ))}
      </div>
    </Aside>
  );
};
export default Sidebar;
