import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled, css } from 'styled-components';
import uuid4 from 'uuid4';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-hot-toast';

import Button from '../components/common/Button';
import Profile from '../storage/profile';
import Network from '../utils/net';
import { FullLogo } from '../assets/logo';
import { CogIcon } from '../assets/24x-icons';
import { PlusIcon } from '../assets/16x-icons';
import { XIcon } from '../assets/16x-icons';

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
`;

const Separator = styled.div`
  width: 2px;
  align-self: stretch;
  background-color: #000;
  opacity: 0.1;
  border-radius: 1px;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

const ConnectSection = styled.section`
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
`;

const InputLabelPair = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Label = styled.div`
  color: #000;
  text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.154px;
  opacity: 0.6;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  gap: 14px;
  border-radius: 12px;
  background-color: #f7f7f7;
  height: 40px;
  transition: all 0.2s ease-in-out;
  outline: 0 solid transparent;
  padding: 0 18px;
  transition-property: background-color, outline, box-shadow;

  &:has(:focus) {
    outline: 1px solid #6299ed;
    background-color: #fff;
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
    color: #000;
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

const ProfileDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  margin-bottom: 18px;
`;

const ProfileDataLabel = styled.div`
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.176px;
`;

const EditProfilesButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.6;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.176px;
  gap: 0px;
  height: 16px;

  cursor: pointer;

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  &:hover,
  &:focus-visible {
    opacity: 1;
    outline: none;
  }
`;

const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const AddProfileButton = styled(Button)`
  gap: 2px;
  background-color: #f4f4f4;
  align-self: stretch;

  &:hover {
    background-color: rgba(10, 10, 10, 0.1);
  }
`;

const tempProfiles = [
  {
    uuid: '30cd1d0a-fe68-4e4f-b2a4-219c97300d4e',
    name: 'Hypixel',
    address: 'mc.hypixel.net',
    port: 14367
  },
  {
    uuid: '30cd1d0a-fe68-4e4f-b2a4-219c97300d4e',
    name: '로컬호스트',
    address: 'localhost',
    port: 14367
  }
];

const Root = () => {
  const [profileName, setProfileName] = useState('');
  const [serverAddress, setServerAddress] = useState('');
  const [serverPort, setServerPort] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [secureConnection, setSecureConnection] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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

  console.log(profiles);

  const handleAddProfile = () => {
    const modal = withReactContent(Swal);

    if (!/[\S]/g.test(profileName)) {
      toast.error('프로필 이름을 작성해야 합니다.');
      return;
    }

    Network.ping(serverAddress, serverPort, securityKey, secureConnection)
      .then((res) => {
        if (res.status === 200) {
          const profile = {
            uuid: uuid4(),
            name: profileName,
            address: serverAddress || 'localhost',
            port: Number.parseInt(serverPort) || 8080,
            key: securityKey,
            isSecureConnection: secureConnection
          };

          Profile.add(profile);
          toast.success('프로필이 추가되었습니다.', { id: 'profile-added' });

          setProfiles(Profile.getAll());
        }
      })
      .catch((err) => {
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
              <p>다음과 같은 오류가 발생하였습니다</p>
              <hr />
              <SyntaxHighlighter language='js' style={docco}>
                {errorText}
              </SyntaxHighlighter>
              <Button onClick={copyToClipboard}>
                <div>클립보드에 복사하기</div>
              </Button>
            </div>
          ),
          width: '80%',
          showConfirmButton: true,
          showCancelButton: false,
          timerProgressBar: true,
          allowEscapeKey: false,
          allowOutsideClick: false
        });
      });
  };

  useEffect(() => {
    setProfiles(Profile.getAll());
  }, []);

  return (
    <RootContainer>
      <Content>
        <ConnectSection $gap='32px'>
          <FullLogo color='black' />

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
            <Link to='/settings' tabIndex={-1}>
              <Button icon={<CogIcon />} padding='12px 20px'>
                설정
              </Button>
            </Link>

            <Button
              styleType='accent'
              onClick={() => {
                handleAddProfile();
              }}
            >
              프로필 생성 후 연결
            </Button>
          </ButtonContainer>
        </ConnectSection>

        <Separator $width='2px' />

        <ConnectSection $gap='0px'>
          <ProfileDataContainer>
            <ProfileDataLabel>프로필로 연결</ProfileDataLabel>
            <EditProfilesButton
              tabIndex={0}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <CogIcon transform='scale(0.666666667)' />
              관리
            </EditProfilesButton>
          </ProfileDataContainer>
          <ProfilesContainer>
            {profiles.map(({ uuid, name, address }, index) => (
              <ProfileItem
                key={index}
                uuid={uuid}
                name={name}
                address={address}
                showBorder={index > 0}
                isEditing={isEditing}
                updateProfile={() => {
                  setProfiles(Profile.getAll());
                }}
              />
            ))}
          </ProfilesContainer>
          <AddProfileButton onClick={handleAddProfile} icon={<PlusIcon />}>
            프로필 추가
          </AddProfileButton>
        </ConnectSection>
      </Content>
    </RootContainer>
  );
};

const ProfileItemBox = styled.div`
  display: flex;
  padding: 18px 16px;
  align-items: center;
  align-self: stretch;
  background: #fff;
  ${({ $showBorder }) =>
    $showBorder && 'border-top: 1px solid rgba(0, 0, 0, 0.10);'}
`;

const ProfileItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  flex: 1 0 0;
`;

const ProfileItemName = styled.div`
  display: -webkit-box;
  align-self: stretch;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: visible;

  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.176px;
`;

const ProfileItemAddress = styled.div`
  display: flex;
  height: 12px;
  flex-direction: column;
  align-self: stretch;
  overflow: visible;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.132px;

  opacity: 0.4;
`;

const EditModeButton = styled.button`
  display: flex;
  padding: 5px 5px;
  align-items: flex-start;
  border-radius: 6px;
  border: 1px solid rgba(216, 65, 58, 0.2);
  background-color: rgba(216, 65, 58, 0);
  cursor: pointer;

  svg {
    color: #d8413a;
  }

  &:hover,
  &:focus-visible {
    border: 1px solid transparent;
    background-color: rgba(216, 65, 58, 0.2);
    outline: none;
  }

  &:active {
    border: 1px solid rgba(216, 65, 58, 0.2);
    background: #d8413a;
  }

  &:active svg {
    color: #fff;
  }
`;

const ProfileItem = ({
  uuid,
  name,
  address,
  showBorder,
  isEditing,
  updateProfile
}) => {
  return (
    <Link to='/dashboard'>
      <ProfileItemBox $showBorder={showBorder}>
        <ProfileItemInfo>
          <ProfileItemName>{name}</ProfileItemName>
          <ProfileItemAddress>{address}</ProfileItemAddress>
        </ProfileItemInfo>

        {isEditing && (
          <>
            <EditModeButton
              onClick={(uuid) => {
                Profile.delete(uuid);
                toast.success('성공적으로 프로필을 삭제했습니다!');
                updateProfile();
              }}
            >
              <XIcon />
            </EditModeButton>
          </>
        )}
      </ProfileItemBox>
    </Link>
  );
};

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

export default Root;
