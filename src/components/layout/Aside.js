import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import IconButton from "@/components/common/IconButton";
import LogoSymbol from "@/assets/logo/LogoSymbol.svg";
import LogoText from "@/assets/logo/LogoText.svg";
import ChartIcon from "@/assets/icons-24x/Chart.svg";
import ConsoleIcon from "@/assets/icons-24x/Console.svg";
import EarthIcon from "@/assets/icons-24x/Earth.svg";
import PeopleIcon from "@/assets/icons-24x/People.svg";
import ServerIcon from "@/assets/icons-24x/Server.svg";
import UpDownArrowIcon from "@/assets/icons-24x/UpDownArrow.svg";
import CogIcon from "@/assets/icons-24x/Cog.svg";
import DoubleLeftArrowIcon from "@/assets/icons-16x/DoubleLeftArrow.svg";
import RightAndLeftArrowIcon from "@/assets/icons-16x/RightAndLeftArrow.svg";

const SIDEBAR_WIDTH = 260;

const AsideBox = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 18px;
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
  background-color: ${({ theme }) => theme.aside.bg};
  border-right: 1px solid ${({ theme }) => theme.aside.border};
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
`;

const Header = styled.div`
  display: flex;
  padding: 0px 16px;
  justify-content: space-between;
  align-self: stretch;
`;

const LogoSection = styled(motion.div)`
  display: flex;
  gap: 8px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItemBox = styled.div`
  @property --overlay-gradient {
    syntax: "<color>";
    initial-value: transparent;
    inherits: false;
  }

  display: flex;
  padding: 10px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  user-select: none;
  font-size: 18px;
  transition: --overlay-gradient 0.4s ease, all 0.4s ease, color 0.2s ease;
  height: 48px;
  overflow: hidden;

  & > * {
    transition: all 0.4s ease;
    transition-property: filter;
    flex-shrink: 0;
  }

  & > span {
    transition: all 0.4s ease;
    transition-property: font-weight;
  }

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.active};
  }

  ${({ $enabled }) =>
    $enabled &&
    css`
      --overlay-gradient: rgba(0, 0, 0, 0.2);

      background: linear-gradient(
          135deg,
          var(--overlay-gradient) 0%,
          rgba(0, 0, 0, 0) 100%
        ),
        ${({ theme }) => theme.aside.menu.bg};
      background-blend-mode: overlay, normal;
      box-shadow: 0 0 24px 0 ${({ theme }) => theme.aside.menu.bg}66;
      color: ${({ theme }) => theme.aside.menu.text};
      font-weight: 700;

      & > * {
        filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
      }

      & > span {
        font-weight: 700;
      }

      &:hover,
      &:focus-visible {
        background: linear-gradient(
            135deg,
            var(--overlay-gradient) 0%,
            rgba(0, 0, 0, 0) 100%
          ),
          ${({ theme }) => theme.aside.menu.bg};
        --overlay-gradient: rgba(0, 0, 0, 0.4);
      }

      &:active {
        --overlay-gradient: rgba(0, 0, 0, 0.6);
      }
    `}
`;

const MenuItem = ({ Icon, text, isExpanded, href }) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <MenuItemBox $enabled={href === pathname}>
        <Icon width={24} height={24} />

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </MenuItemBox>
    </Link>
  );
};

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
`;

/** 컴포넌트 이름이 너무 길어서 시인성을 높이기 위해 점으로 구별해 보려고 했어요. */
const ProfileChanger = {};

ProfileChanger.Box = styled(motion.button)`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  user-select: none;
  background-color: ${({ theme }) => theme.aside.profile.bg};
  transition: background-color 0.2s ease;
  overflow: hidden;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.aside.profile.hoverBg};
  }

  &:active {
    background-color: ${({ theme }) => theme.aside.profile.activeBg};
  }

  svg {
    color: ${({ theme }) => theme.aside.profile.icon};
  }
`;

ProfileChanger.Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 0 0;
  width: 0;
  flex-shrink: 0;
`;

ProfileChanger.Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

ProfileChanger.AddressWrapper = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.aside.profile.address};
`;

ProfileChanger.Address = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const routes = [
  { Icon: ChartIcon, text: "개요", href: "/dashboard/overview" },
  { Icon: ServerIcon, text: "서버 상태", href: "/dashboard/stats" },
  { Icon: EarthIcon, text: "세계", href: "/dashboard/worlds" },
  { Icon: PeopleIcon, text: "플레이어", href: "/dashboard/players" },
  { Icon: UpDownArrowIcon, text: "트래픽", href: "/dashboard/traffic" },
  { Icon: ConsoleIcon, text: "콘솔 / 로그", href: "/dashboard/console" },
];

const Aside = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // XXX isExpanded 로컬 스토리지 저장

  return (
    <AsideBox animate={{ width: isExpanded ? SIDEBAR_WIDTH : 92 }}>
      <Top>
        <Header>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <LogoSection
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
              >
                <LogoSymbol width={20} height={20} />
                <LogoText width={73} height={20} />
              </LogoSection>
            )}
          </AnimatePresence>

          <IconButton
            style={{ margin: -6 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              style={{ display: "flex" }}
            >
              <DoubleLeftArrowIcon width={16} height={16} />
            </motion.div>
          </IconButton>
        </Header>

        <MenuList>
          {routes.map(({ Icon, text, href }) => (
            <MenuItem
              Icon={Icon}
              text={text}
              href={href}
              isExpanded={isExpanded}
              key={href}
            />
          ))}
        </MenuList>
      </Top>

      <Bottom>
        <ProfileChanger.Box>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <ProfileChanger.Info
                initial={{ opacity: 0, x: -20, height: 0, marginRight: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto", marginRight: 10 }}
                exit={{ opacity: 0, x: -20, height: 0, marginRight: 0 }}
              >
                <ProfileChanger.Name>프로필 이름</ProfileChanger.Name>

                <ProfileChanger.AddressWrapper>
                  <ProfileChanger.Address>
                    example.comexample.com
                  </ProfileChanger.Address>
                  :25565
                </ProfileChanger.AddressWrapper>
              </ProfileChanger.Info>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ flexGrow: isExpanded ? 0 : 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RightAndLeftArrowIcon width={16} height={16} />
          </motion.div>
        </ProfileChanger.Box>

        <MenuItem
          Icon={CogIcon}
          text="설정"
          isExpanded={isExpanded}
          href="/settings"
        />
      </Bottom>
    </AsideBox>
  );
};

export default Aside;
