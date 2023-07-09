import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';

import Profile from '../../storage/profile';
import { PlusIcon } from '../../assets/16x-icons';
import { XIcon } from '../../assets/16x-icons';
import Button from './Button';
import { CogIcon } from '../../assets/24x-icons';
import { useRecoilState } from 'recoil';
import { profilesState } from '../../contexts/states';
import { showModal } from '../../utils/modal';
import ProfileCreateForm from './ProfileCreateForm';

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

const ProfileList = () => {
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
          showModal(<ProfileCreateForm />, 484, { showCloseButton: false });
        }}
        icon={<PlusIcon />}
        // TODO 생성 시 모달 닫기
      >
        프로필 추가
      </AddProfileButton>
    </Section>
  );
};

export default ProfileList;
