import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import Link from "@/components/common/Link";
import IconButton from "@/components/common/IconButton";
import LogoSymbol from "@/assets/logo/LogoSymbol.svg";
import LogoText from "@/assets/logo/LogoText.svg";
import DoubleLeftArrowIcon from "@/assets/icons-16x/DoubleLeftArrow.svg";
import RightAndLeftArrowIcon from "@/assets/icons-16x/RightAndLeftArrow.svg";
import { dashboardRoutes as routes, commonRoutes } from "@/constants/routes";
import { useAsideExpanded } from "@/hooks/useLocalStorage";

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

const MenuItemLink = styled(Link)`
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
  const router = useRouter();

  return (
    <MenuItemLink
      href={href}
      $enabled={href === router.pathname.replace("[locale]/", "")}
    >
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
    </MenuItemLink>
  );
};

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
`;

/** 컴포넌트 이름이 너무 길어서 시인성을 높이기 위해 구두점으로 구별해 보려고 했습니다 */
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

const Aside = () => {
  const [isExpanded, setIsExpanded] = useAsideExpanded();

  const { settings: settingsRoute } = commonRoutes;

  return (
    <AsideBox animate={{ width: isExpanded ? SIDEBAR_WIDTH : 92 }}>
      <Top>
        <Header>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <Link href="/">
                <LogoSection
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                >
                  <LogoSymbol width={20} height={20} />
                  <LogoText width={73} height={20} />
                </LogoSection>
              </Link>
            )}
          </AnimatePresence>

          <IconButton
            style={{ margin: -6 }}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "사이드 바 접기" : "사이드 바 펼치기"}
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
          {Object.values(routes).map(({ iconComponent, text, href }) => (
            <MenuItem
              Icon={iconComponent}
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
          Icon={settingsRoute.iconComponent}
          text={settingsRoute.text}
          isExpanded={isExpanded}
          href={settingsRoute.href}
        />
      </Bottom>
    </AsideBox>
  );
};

export default Aside;
