import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo80, LogoText } from '../assets/logo';
import { ThemeContext, styled } from 'styled-components';
import Select from 'react-select';
import { open } from '@tauri-apps/api/shell';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '../components/common/Button';
import LayerPopup, { PopupSection } from '../components/common/LayerPopup';
import AppData from '../storage/data';
import { useSetRecoilState } from 'recoil';
import { getVersion } from '@tauri-apps/api/app';
import { trapPauseState } from '../contexts/states';

import Theme from '../storage/theme';
import Update from './Update';

const WebsiteInfoContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 24px;
`;

const WebsiteInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  flex: 1 0 0;
`;

const WebsiteVersion = styled.div`
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.176px;
  opacity: 0.6;
`;

const SettingOptionContainer = styled.div`
  display: flex;
  padding: 18px 14px;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const SettingName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
`;

const SettingDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  opacity: 0.6;
`;

const modal = withReactContent(Swal);

const SettingOption = ({
  options,
  optionName,
  optionDescription,
  onSelect,
  defaultValue
}) => {
  const [value, setValue] = useState(defaultValue || options[0]);
  const theme = useContext(ThemeContext);

  return (
    <SettingOptionContainer>
      <SettingInfo>
        <SettingName>{optionName}</SettingName>
        {optionDescription ? (
          <SettingDescription>{optionDescription}</SettingDescription>
        ) : (
          <></>
        )}
      </SettingInfo>

      <Select
        styles={{
          control: () => ({
            color: theme.text,
            display: 'flex',
            border: 'none',
            width: '175px'
          }),
          option: (styles) => ({
            ...styles,
            '&:hover, &:focus-visible': {
              background: theme.input.hoverBg
            },
            '&:active': {
              background: theme.input.activeBg
            }
          }),
          menu: (styles) => ({
            ...styles,
            background: theme.input.bg
          }),
          singleValue: (styles) => ({
            ...styles,
            color: theme.input.text
          })
        }}
        components={{
          IndicatorSeparator: () => null
        }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onSelect(newValue);
        }}
        options={options}
        isSearchable={false}
      />
    </SettingOptionContainer>
  );
};

const SettingButton = ({
  children,
  optionName,
  optionDescription,
  styleType,
  onClick
}) => {
  return (
    <SettingOptionContainer>
      <SettingInfo>
        <SettingName>{optionName}</SettingName>
        {optionDescription ? (
          <SettingDescription>{optionDescription}</SettingDescription>
        ) : (
          <></>
        )}
      </SettingInfo>
      <Button styleType={styleType} padding='8px 16px' onClick={onClick}>
        {children}
      </Button>
    </SettingOptionContainer>
  );
};

const ClearData = () => {
  AppData.clear();
  modal.fire({
    icon: 'success',
    html: (
      <>
        <h3>모든 데이터가 삭제되었습니다.</h3>
        <p>잠시 후 메인 페이지로 이동됩니다.</p>
      </>
    ),
    timer: 3000,
    showConfirmButton: false,
    showCancelButton: false,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    willClose: () => {
      window.location.href = '/';
    }
  });

  // toast.success("모든 데이터가 삭제되었습니다.");
};

const themeOptions = [
  { value: 'auto', label: '시스템 설정과 연동' },
  { value: 'dark', label: '다크' },
  { value: 'light', label: '라이트' }
];

const Modal = () => {
  const theme = useContext(ThemeContext);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const setThemeState = useSetRecoilState(trapPauseState);
  const navigate = useNavigate();
  const location = useLocation();

  const [appVersion, setAppVersion] = useState('Failed to get app version');

  useEffect(() => {
    const getAppVersion = async () => {
      const version = await getVersion();
      setAppVersion(`${version}`);
    };
    getAppVersion();
  }, []);

  const goBackward = () => {
    if (location.key !== 'default') {
      // 이 페이지로 직접 접속하면 key가 default로 설정됩니다.
      // https://github.com/remix-run/react-router/discussions/9788#discussioncomment-4604278
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence mode='' onExitComplete={goBackward}>
      {isModalOpen && (
        <LayerPopup
          width={'50rem'}
          title='설정'
          onClose={() => setIsModalOpen(false)}
          footer={<div> © 2023 "Dashify" Development Team</div>}
        >
          <WebsiteInfoContainer>
            <Logo80 background={theme.aside.logo.bg} foreground={theme.aside.logo.fg} />
            <WebsiteInfo>
              <LogoText />
              <WebsiteVersion>v{appVersion}</WebsiteVersion>
            </WebsiteInfo>
            <Button
              padding={'8px 16px'}
              styleType='filled'
              onClick={() => {
                const { hostname, port } = window.location;
                !(hostname === 'localhost' && port === '5173')
                  ? open('https://github.com/MC-Dashify')
                  : window.open('https://github.com/MC-Dashify', '_blank');
              }}
            >
              GitHub 리포지토리 방문
            </Button>
            <Update />
          </WebsiteInfoContainer>

          <PopupSection title='외관' gap='0' titleMargin='18px'>
            <SettingOption
              optionName='테마'
              options={themeOptions}
              onSelect={(newValue) => {
                Theme.update(newValue.value);
                setThemeState(newValue.value);
                window.location.reload();
                // XXX select 변경 시 테마도 실시간으로 변경되도록
              }}
              defaultValue={themeOptions.find(
                (option) => option.value === Theme.get()
              )}
            />
          </PopupSection>

          <PopupSection title='애플리케이션' gap='0' titleMargin='18px'>
            <SettingButton
              optionName='모든 데이터 삭제'
              optionDescription='Dashify에 저장된 모든 로컬 데이터(프로필 등)을 삭제합니다.'
              styleType='warning'
              onClick={ClearData}
            >
              데이터 삭제
            </SettingButton>
          </PopupSection>
        </LayerPopup>
      )}
    </AnimatePresence>
  );
};

export default Modal;
