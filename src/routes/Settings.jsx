import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo80, LogoText } from '../assets/logo';
import { styled } from 'styled-components';
import Select from 'react-select';
import { open } from '@tauri-apps/api/shell';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '../components/common/Button';
import LayerPopup, { PopupSection } from '../components/common/LayerPopup';
import AppData from '../storage/data';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { toast } from 'react-hot-toast';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState
} from 'recoil';
import { platform } from '@tauri-apps/api/os';
import { trapPauseState } from '../contexts/states';

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

const SettingOption = ({ options, optionName, optionDescription }) => {
  const [value, setValue] = useState(options[0]);

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
            display: 'flex',
            border: 'none',
            width: '175px'
          })
        }}
        components={{
          IndicatorSeparator: () => null
        }}
        value={value}
        onChange={(newValue) => setValue(newValue)}
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

const Modal = ({ install }) => {
  // const [currentTrapPauseState, setCurrentTrapPauseState] =
  //   useRecoilState(trapPauseState);

  const setCurrentTrapPauseState = useSetRecoilState(trapPauseState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const goBackward = () => {
    if (location.key !== 'default') {
      // 이 페이지로 직접 접속하면 key가 default로 설정됩니다.
      // https://github.com/remix-run/react-router/discussions/9788#discussioncomment-4604278
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const Update = async () => {
    try {
      toast.dismiss('update-latest');
      toast.loading('업데이트 확인중...', {
        id: 'update-checking'
      });

      const { shouldUpdate, manifest } = await checkUpdate();

      if (shouldUpdate) {
        // You could show a dialog asking the user if they want to install the update here.
        console.log(
          `Latest Update Info: ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
        );

        modal
          .fire({
            icon: 'info',
            html: (
              <>
                <h3>업데이트 발견</h3>
                <p>업데이트를 설치할까요?</p>
              </>
            ),
            showConfirmButton: true,
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: false,
            confirmButtonText: '지금 업데이트',
            cancelButtonText: '나중에 업데이트'
          })
          .then(async (result) => {
            toast.dismiss('update-checking');

            console.log(result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const platformName = await platform();

              modal.fire({
                icon: 'loading',
                html: (
                  <>
                    <h3>업데이트 설치중</h3>
                  </>
                ),
                showConfirmButton: false,
                showCancelButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                loading: true,
                willOpen: () => {
                  modal.showLoading();
                }
              });

              await installUpdate();

              if (platformName !== 'win32') {
                await relaunch();
              }
            }
          })
          .then(() => {
            setCurrentTrapPauseState({ settings: false });
          });
      } else {
        toast.success('최신 버전입니다.', {
          id: 'update-latest'
        });
        console.log('No update available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AnimatePresence mode='' onExitComplete={goBackward}>
        {isModalOpen && (
          <LayerPopup
            width={'50rem'}
            title='설정'
            onClose={() => setIsModalOpen(false)}
            footer={<div> © 2023 "Dashify" Development Team</div>}
          >
            <WebsiteInfoContainer>
              <Logo80 background='black' foreground='white' />
              <WebsiteInfo>
                <LogoText />
                <WebsiteVersion>v{AppData.get('etc.version')}</WebsiteVersion>
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
              <Button
                padding={'8px 16px'}
                styleType='accent'
                onClick={async () => {
                  setCurrentTrapPauseState({ settings: true });

                  await Update();
                }}
              >
                업데이트 확인
              </Button>
            </WebsiteInfoContainer>
            {/* <PopupSection title="외관" gap="0" titleMargin="18px">
              <SettingOption
                optionName="표시 언어(Language)"
                optionDescription="Dashify에 표시될 언어입니다."
                options={[{ value: "korean", label: "한국어(Korean)" }]}
              />
              <SettingOption
                optionName="테마"
                options={[
                  { value: "system", label: "시스템 설정과 연동" },
                  { value: "dark", label: "다크" },
                  { value: "light", label: "라이트" },
                ]}
              />
            </PopupSection> */}
            <PopupSection title='애플리케이션' gap='0' titleMargin='18px'>
              {/* {install === undefined ? (
                ''
              ) : (
                <SettingButton
                  optionName='애플리케이션 설치'
                  optionDescription='Dashify을 디바이스에 설치합니다.'
                  styleType='filled'
                  onClick={install}
                >
                  설치
                </SettingButton>
              )} */}
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
    </div>
  );
};

export default Modal;
