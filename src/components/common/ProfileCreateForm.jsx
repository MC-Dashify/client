import { useState } from 'react';
import { Link } from 'react-router-dom';
import uuid4 from 'uuid4';
import { styled, css } from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

import Profile from '../../storage/profile';
import Button from './Button';
import { FullLogo } from '../../assets/logo';
import Network from '../../utils/net';
import { CogIcon } from '../../assets/24x-icons';
import { useSetRecoilState } from 'recoil';
import { currentProfileState, profilesState } from '../../contexts/states';
import AppData from '../../storage/data';

import { AnimatePresence } from 'framer-motion';
import LayerPopup from './LayerPopup';

const modal = withReactContent(Swal);

const Separator = styled.div`
  width: 2px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.text};
  opacity: 0.1;
  border-radius: 1px;

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;

  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
  flex: 1 0 0;
`;

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  margin-left: 4px;
  margin-right: 4px;
`;

const InputLabelPair = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Label = styled.div`
  text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 700;
  opacity: 0.6;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  gap: 14px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.input.bg};
  height: 40px;
  transition: all 0.2s ease-in-out;
  outline: 0 solid transparent;
  padding: 0 18px;
  transition-property: background-color, outline, box-shadow;

  &:has(:focus) {
    outline: 1px solid ${({ theme }) => theme.input.focusOutline};
    background-color: rgba(0, 0, 0, 0.01);
    box-shadow: 0px 0px 16px 0px rgba(98, 153, 237, 0.2),
      0px 0px 8px 0px rgba(98, 153, 237, 0.2) inset;
  }
`;

const InputField = styled.input`
  background-color: transparent;
  border: none;
  padding: 12px 0;

  ${({ $width }) =>
    $width
      ? css`
          width: ${$width};
        `
      : css`
          flex: 1;
        `}

  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 0.4;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputFieldBox = ({ label, children }) => {
  return (
    <InputLabelPair>
      <Label>{label}</Label>

      <InputFieldWrapper>{children}</InputFieldWrapper>
    </InputLabelPair>
  );
};

const CheckboxInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  padding: 3px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  border: 1px solid black;
  height: 14px;
  cursor: pointer;
`;

const CheckboxLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  user-select: none;
`;

const Checkbox = ({ label, checked, setChecked }) => {
  return (
    <CheckboxContainer
      tabIndex={0}
      onClick={() => setChecked(!checked)}
      onKeyDown={({ key }) => {
        if (key === 'Enter') setChecked(!checked);
      }}
    >
      <CheckboxInput type='checkbox' tabIndex={-1} checked={checked} readOnly />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

const ProfileCreateForm = ({
  hasSettingButton,
  submitButtonText,
  onAfterSubmit,
  isOpen,
  setIsOpen
}) => {
  const setProfiles = useSetRecoilState(profilesState);
  const setCurrentProfiles = useSetRecoilState(currentProfileState);
  const [profileName, setProfileName] = useState('');
  const [serverAddress, setServerAddress] = useState('');
  const [serverPort, setServerPort] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [secureConnection, setSecureConnection] = useState(false);

  const handlePortChange = (e) => {
    const { value } = e.target;
    const number = Number(value);

    if (value === '') {
      setServerPort(value);
      return;
    }

    if (number < 1 || number > 65535 || isNaN(number)) {
      return;
    }

    setServerPort(number);
  };

  const handleSubmitButtonClick = () => {
    if (!/[\S]/g.test(profileName)) {
      toast.error('프로필 이름을 작성해야 합니다.');
      return;
    }

    toast.loading('서버에 연결 중입니다...', { id: 'profile-adding' });

    Network.ping(
      serverAddress === '' ? 'localhost' : serverAddress,
      serverPort === '' ? 8080 : serverPort,
      securityKey,
      secureConnection
    )
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss();
          const profile = {
            uuid: uuid4(),
            name: profileName,
            address: serverAddress || 'localhost',
            port: Number.parseInt(serverPort) || 8080,
            key: securityKey,
            isSecureConnection: secureConnection
          };

          Profile.add(profile);
          AppData.set('etc.last_profile', profile.uuid);
          setProfiles(Profile.getAll());
          if (hasSettingButton) {
            setCurrentProfiles(profile);
          }

          Swal.close();
          toast.success('프로필이 추가되었습니다.', { id: 'profile-added' });

          onAfterSubmit && onAfterSubmit();
        }
      })
      .catch((err) => {
        toast.dismiss();
        const errorText = `${err.stack}`.replace(/\\n/g, '\n');
        const copyToClipboard = async () => {
          const { clipboard } = navigator;

          if (typeof clipboard == 'undefined') {
            toast.error(
              '복사에 실패했습니다. 브라우저가 복사 기능을 지원하지 않거나, 애플리케이션이 HTTPS로 연결되지 않았습니다.',
              { id: 'clipboard' }
            );
            return;
          }

          try {
            await clipboard.writeText(errorText);
            toast.success('복사되었습니다.', { id: 'clipboard' });
          } catch (e) {
            toast.error('복사에 실패했습니다.', { id: 'clipboard' });
          }
        };

        modal.fire({
          icon: 'error',
          html: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h3>연결 실패</h3>
              {errorText.includes('418') ? (
                <>
                  <p>서버가 Dashify를 비활성화 하였습니다.</p>
                </>
              ) : (
                <>
                  <p>다음과 같은 오류가 발생하였습니다</p>
                  <hr />
                  <SyntaxHighlighter language='js' style={docco}>
                    {errorText}
                  </SyntaxHighlighter>
                  <Button onClick={copyToClipboard}>
                    <div>클립보드에 복사하기</div>
                  </Button>
                </>
              )}
            </div>
          ),
          width: errorText.includes('418') ? '' : '75%',
          showConfirmButton: true,
          showCancelButton: false,
          timerProgressBar: true,
          allowEscapeKey: false,
          allowOutsideClick: false
        });
      });
  };

  const form = (
    <>
      <InputFieldContainer>
        <InputFieldBox label='프로필 이름'>
          <InputField
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
        </InputFieldBox>

        <CheckboxInputField>
          <InputFieldBox label='서버 주소와 포트'>
            <InputField
              placeholder='localhost'
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
            />
            <Separator $width='1px' style={{ margin: '8px 0' }} />
            <InputField
              placeholder='8080'
              step='1'
              type='text'
              $width='50px'
              value={serverPort}
              onChange={handlePortChange}
            />
          </InputFieldBox>
          <Checkbox
            label='보안 연결(HTTPS) 사용'
            checked={secureConnection}
            setChecked={setSecureConnection}
          />
        </CheckboxInputField>

        <InputFieldBox label='보안 키'>
          <InputField
            placeholder='서버에서 발급된 보안 키 입력'
            type='password'
            value={securityKey}
            onChange={(e) => setSecurityKey(e.target.value)}
          />
        </InputFieldBox>
      </InputFieldContainer>

      <ButtonContainer>
        {hasSettingButton && (
          <Link to='/settings' tabIndex={-1}>
            <Button icon={<CogIcon />} padding='12px 20px'>
              설정
            </Button>
          </Link>
        )}

        <Button styleType='accent' onClick={handleSubmitButtonClick}>
          {submitButtonText || '생성'}
        </Button>
      </ButtonContainer>
    </>
  );

  return (
    setIsOpen ?
    (
      <AnimatePresence mode=''>
        {isOpen &&
          <LayerPopup
            title='프로필 생성'
            onClose={() => setIsOpen(false)}
          >
            {form}
          </LayerPopup>
        }
      </AnimatePresence>
    ):
    (
      <Section $gap='32px'>
        <FullLogo />
        {form}
      </Section>
    )
  );
};

export default ProfileCreateForm;
