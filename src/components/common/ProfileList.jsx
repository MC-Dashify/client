import { styled } from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';

import Profile from '../../storage/profile';
import { PlusIcon } from '../../assets/16x-icons';
import { XIcon } from '../../assets/16x-icons';
import Button from './Button';
import { CogIcon } from '../../assets/24x-icons';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState
} from 'recoil';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  profilesState,
  currentProfileState,
  statsState,
  worldsState,
  playersState
} from '../../contexts/states';
import { showModal } from '../../utils/modal';
import ProfileCreateForm from './ProfileCreateForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppData from '../../storage/data';
import Swal from 'sweetalert2';
import Network from '../../utils/net';
import withReactContent from 'sweetalert2-react-content';

const modal = withReactContent(Swal);

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  flex: 1 0 0;
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

const ProfileItemDiv = styled.div`
  cursor: pointer;
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
  const [currentProfile, setCurrentProfile] =
    useRecoilState(currentProfileState);
  const setStats = useSetRecoilState(statsState);
  const setWorlds = useSetRecoilState(worldsState);
  const setPlayers = useSetRecoilState(playersState);

  const profile = Profile.get(uuid);

  const navigate = useNavigate();

  const Component = ({ children }) =>
    isEditing ? (
      <>{children}</>
    ) : (
      <ProfileItemDiv
        onClick={() => {
          if (currentProfile.uuid === uuid) return;
          toast.loading('서버에 연결 중입니다...', { id: 'profile-adding' });

          Network.ping(
            profile.address,
            profile.port,
            profile.key,
            profile.isSecureConnection
          )
            .then((res) => {
              if (res.status === 200) {
                toast.dismiss();
                setCurrentProfile(profile);
                AppData.set('etc.last_profile', uuid);
                Swal.close();
                navigate('/dashboard');
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
        }}
      >
        {children}
      </ProfileItemDiv>
    );

  return (
    <Component>
      <ProfileItemBox $showBorder={showBorder}>
        <ProfileItemInfo>
          <ProfileItemName>{name}</ProfileItemName>
          <ProfileItemAddress>{address}</ProfileItemAddress>
        </ProfileItemInfo>

        {isEditing && currentProfile.uuid !== uuid && (
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
    </Component>
  );
};

const ProfileList = () => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const [profiles, setProfiles] = useRecoilState(profilesState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfiles(Profile.getAll());
  }, [setProfiles]);

  return (
    <Section>
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

      <AddProfileButton
        onClick={() => {
          showModal(
            <RecoilBridge>
              <ProfileCreateForm />
              <Toaster position='bottom-center' style={{ zIndex: '20' }} />
            </RecoilBridge>,
            484,
            { showCloseButton: false }
          );
        }}
        icon={<PlusIcon />}
      >
        프로필 추가
      </AddProfileButton>
    </Section>
  );
};

export default ProfileList;
