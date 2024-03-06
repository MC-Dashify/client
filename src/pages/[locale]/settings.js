import { useRouter } from "next/router";
import styled from "styled-components";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
} from "@mui/material/colors";
import { open } from "@tauri-apps/api/shell";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
} from "@nextui-org/react";
const { version } = require("@/../package.json");

import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import LogoSymbol from "@/assets/logo/LogoSymbol.svg";
import LogoText from "@/assets/logo/LogoText.svg";
import XIcon from "@/assets/icons-16x/X.svg";
import Grid4SquaresIcon from "@/assets/icons-24x/Grid4Squares.svg";
import PaintRollerIcon from "@/assets/icons-24x/PaintRoller.svg";
import LockIcon from "@/assets/icons-24x/Lock.svg";
import BottomArrowWithoutShaftIcon from "@/assets/icons-16x/BottomArrowWithoutShaft.svg";
import {
  useHideDomain,
  useLaungage,
  usePointColor,
  useTheme,
} from "@/hooks/useLocalStorage";
import { useI18n } from "@/hooks/useI18n";
import { useRouteRedirect } from "@/hooks/useRouteRedirect";
import LocalStorage from "@/lib/localstorage";
import { languageDetector } from "@/lib/languageDetector";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 42px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 824px;
  gap: 32px;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const PageTitle = styled.h1`
  font-weight: 700;
  line-height: 100%;
  font-size: 32px;
  flex-grow: 1;
`;

const ApplicationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Version = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin-top: 4px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const SectionBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 20px;
    line-height: 120%;
    font-weight: 700;
  }
`;

const Section = ({ title, icon, children }) => (
  <SectionBox>
    <SectionHeader>
      {icon}
      <h2>{title}</h2>
    </SectionHeader>

    <div>{children}</div>
  </SectionBox>
);

const SectionItemBox = styled.div`
  display: flex;
  padding: 18px 0;
  align-items: center;
  gap: 32px;
  min-height: calc(32px + 18px * 2); // 32px: content min height, 18px: padding

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
  }

  p {
    font-size: 14px;
    opacity: 0.6;
    font-weight: 400;
    line-height: 120%;
    word-break: keep-all;
  }
`;

const SectionItemLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
`;

const SectionItem = ({ title, memo, children }) => (
  <SectionItemBox>
    <SectionItemLabelWrapper>
      <h3>{title}</h3>
      {memo && <p>{memo}</p>}
    </SectionItemLabelWrapper>

    {children}
  </SectionItemBox>
);

const ItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.divider.primary};
`;

const DropdownSelect = styled.div`
  display: flex;
  padding: 12px 18px;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.active};
  }
`;

/**
 * @param {object} props
 * @param {string} props.ariaLabel
 * @param {object[]} props.options
 * @param {string} props.options[].label
 * @param {string} props.options[].key
 * @param {string} props.selectedOption options key
 * @param {(selectedOptions: string) => void} props.onSelectionChange
 */
const SettingDropdown = ({
  "aria-label": ariaLabel,
  options,
  selectedOption,
  onSelectionChange,
  ...props
}) => {
  const selectedOptionSet = new Set([selectedOption]);

  return (
    <Dropdown shouldBlockScroll={false}>
      <DropdownTrigger>
        <DropdownSelect tabIndex={0}>
          {options.find(({ key }) => key === selectedOption)?.label}

          <BottomArrowWithoutShaftIcon width={16} height={16} />
        </DropdownSelect>
      </DropdownTrigger>

      <DropdownMenu
        aria-label={ariaLabel}
        selectionMode="single"
        disallowEmptySelection={true}
        selectedKeys={selectedOptionSet}
        onSelectionChange={(selection) => onSelectionChange([...selection][0])}
        {...props}
      >
        {options.map(({ label, key, startContent }) => (
          <DropdownItem startContent={startContent} key={key}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const ColorPreview = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-color: ${({ color }) => color};
`;

const Footer = styled.footer`
  align-self: stretch;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  opacity: 0.4;
`;

// XXX label에 i18n 문자열 키를 넣고 constants 폴더로 옮기는 건 어떨까
const languageOptions = {
  initialKey: "ko",
  data: [
    { label: "한국어", key: "ko" },
    { label: "English", key: "en" },
  ],
};

const themeOptions = {
  initialKey: "system",
  data: [
    { label: "시스템 설정과 연동", key: "system" },
    { label: "라이트 테마", key: "light" },
    { label: "다크 테마", key: "dark" },
  ],
};

const pointColorOptions = {
  initialKey: "system",
  data: [
    {
      label: "빨간색",
      key: "red",
      startContent: <ColorPreview color={red[500]} />,
    },
    {
      label: "분홍색",
      key: "pink",
      startContent: <ColorPreview color={pink[500]} />,
    },
    {
      label: "보라색",
      key: "purple",
      startContent: <ColorPreview color={purple[500]} />,
    },
    {
      label: "짙은 보라색",
      key: "deepPurple",
      startContent: <ColorPreview color={deepPurple[500]} />,
    },
    {
      label: "남색",
      key: "indigo",
      startContent: <ColorPreview color={indigo[500]} />,
    },
    {
      label: "파란색(기본)",
      key: "blue",
      startContent: <ColorPreview color={blue[500]} />,
    },
    {
      label: "하늘색",
      key: "lightBlue",
      startContent: <ColorPreview color={lightBlue[500]} />,
    },
    {
      label: "청록색",
      key: "cyan",
      startContent: <ColorPreview color={cyan[500]} />,
    },
    {
      label: "옥빛 청록색",
      key: "teal",
      startContent: <ColorPreview color={teal[500]} />,
    },
    {
      label: "초록색",
      key: "green",
      startContent: <ColorPreview color={green[500]} />,
    },
    {
      label: "연두색",
      key: "lightGreen",
      startContent: <ColorPreview color={lightGreen[500]} />,
    },
    {
      label: "라임색",
      key: "lime",
      startContent: <ColorPreview color={lime[500]} />,
    },
    {
      label: "호박색",
      key: "amber",
      startContent: <ColorPreview color={amber[500]} />,
    },
    {
      label: "주황색",
      key: "orange",
      startContent: <ColorPreview color={orange[500]} />,
    },
    {
      label: "짙은 주황색",
      key: "deepOrange",
      startContent: <ColorPreview color={deepOrange[500]} />,
    },
    {
      label: "갈색",
      key: "brown",
      startContent: <ColorPreview color={brown[500]} />,
    },
    {
      label: "청회색",
      key: "blueGrey",
      startContent: <ColorPreview color={blueGrey[500]} />,
    },
  ],
};

const SettingsPage = () => {
  const router = useRouter();
  const { t, lang } = useI18n();
  const { redirect } = useRouteRedirect();

  const [theme, setTheme] = useTheme();
  const [pointColor, setPointColor] = usePointColor();

  const [isDomainHidden, setIsDomainHidden] = useHideDomain();

  const handleChangeLanguage = (afterLang) => {
    let _pathname = router.pathname;

    Object.keys(router.query).forEach((slug) => {
      if (slug === "locale") {
        _pathname = _pathname.replace(`[${slug}]`, afterLang);
        return;
      }

      _pathname = _pathname.replace(`[${slug}]`, router.query[slug]);
    });

    languageDetector.cache && languageDetector.cache(afterLang);
    router.replace(_pathname);
    // useRouteRedirect를 사용하지 않는 이유는 _pathname 자체에 [locale]이 담겨 있기 때문입니다.
  };

  return (
    <Content>
      <Header>
        <PageTitle>설정</PageTitle>

        <IconButton onClick={() => router.back()}>
          <XIcon width={16} height={16} />
        </IconButton>
      </Header>

      <Main>
        <ApplicationInfo>
          <LogoSymbol width={54} height={54} />

          <div style={{ flexGrow: "1" }}>
            <LogoText width={105} height={28} />
            <Version>v{version}</Version>
          </div>

          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              open(process.env.NEXT_PUBLIC_GITHUB_REPO_LINK);
            }}
          >
            GitHub 리포지토리 방문
          </Button>

          <Button variant="primary" size="medium">
            업데이트 확인
            {/* TODO 업데이트 확인 버튼 */}
          </Button>
        </ApplicationInfo>

        <Section title="외관" icon={<PaintRollerIcon width={24} height={24} />}>
          <SectionItem title="표시 언어(Language)">
            <SettingDropdown
              aria-label="표시 언어 선택"
              options={languageOptions.data}
              selectedOption={lang}
              onSelectionChange={(value) => handleChangeLanguage(value)}
            />
          </SectionItem>

          <ItemDivider />

          <SectionItem title="테마">
            <SettingDropdown
              aria-label="테마 선택"
              options={themeOptions.data}
              selectedOption={theme}
              onSelectionChange={setTheme}
            />
          </SectionItem>

          <ItemDivider />

          <SectionItem
            title="포인트 컬러"
            memo={
              <>
                화면에서 강조해서 표시되는 요소의 색상을 변경합니다.{" "}
                <strong>특정 색상은 가독성을 해칠할 수 있습니다.</strong> 일부
                요소는 색상이 변경되면 혼란이 생길 수 있기 때문에 설정이
                적용되지 않습니다.
              </>
            }
          >
            <SettingDropdown
              aria-label="포인트 컬러 선택"
              options={pointColorOptions.data}
              selectedOption={pointColor}
              onSelectionChange={setPointColor}
            />
          </SectionItem>
        </Section>

        <Section title="보안" icon={<LockIcon width={24} height={24} />}>
          <SectionItem
            title="화면에서 서버 주소 모두 숨기기"
            memo="서버 주소가 유출되는 일을 방지하기 위해 화면에서 서버 주소를 모두 숨깁니다. 서버 주소가 꼭 표시되어야 하는 페이지에서는 진입 전 경고 창이 표시됩니다."
          >
            <Checkbox
              isSelected={isDomainHidden}
              onValueChange={setIsDomainHidden}
              size="lg"
            />
          </SectionItem>
        </Section>

        <Section
          title="애플리케이션"
          icon={<Grid4SquaresIcon width={24} height={24} />}
        >
          <SectionItem
            title="모든 데이터 삭제 및 초기화"
            memo="애플리케이션에 저장된 모든 로컬 데이터(프로필, 설정 등)를 삭제 및 초기화합니다. 한번 삭제하면 복구할 수 없습니다."
          >
            <Button
              variant="danger"
              size="medium"
              onClick={() => {
                LocalStorage.clear();
                redirect("/");
              }}
            >
              {/* TODO 모달로 확인 창 띄우는 게 좋을 듯 */}
              데이터 삭제
            </Button>
          </SectionItem>
        </Section>
      </Main>

      <Footer>
        {/*
          THE PHRASE BELOW IS THE LEGAL PHRASE for copyright notices
          and MUST NOT BE MODIFIED w/o full consultation with a team
          member on the project. Modifications made w/o consultation
          will force the change to be retracted.

          아래 문구는 저작권 표시를 위한 법적 문구이며, 프로젝트 팀원과의
          충분한 상의 없이 수정되어선 안 됩니다. 상의 없이 수정됐을 경우
          변경 사항이 강제로 철회됩니다.
        */}
        © 2023 “Dashify” Development Team.
      </Footer>
    </Content>
  );
};

SettingsPage.getLayout = (page) => <PageWrapper>{page}</PageWrapper>;

export default SettingsPage;
