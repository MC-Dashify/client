import { useState } from "react";

import { styled, css } from "styled-components";
import { Link } from "react-router-dom";
import { FullLogo } from "../assets/logo";
import Button from "../components/common/Button";
import { CogIcon } from "../assets/24x-icons";
import { PlusIcon } from "../assets/16x-icons";

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
    box-shadow: 0px 0px 16px 0px rgba(98, 153, 237, 0.2), 0px 0px 8px 0px rgba(98, 153, 237, 0.2) inset;
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

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
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
  background-color: #F4F4F4;
  align-self: stretch;

  &:hover {
    background-color: rgba(10, 10, 10, 0.1);
  }
`;

const tempProfiles = [
  {
    "uuid": "30cd1d0a-fe68-4e4f-b2a4-219c97300d4e",
    "name": "Hypixel",
    "address": "mc.hypixel.net",
    "port": 14367
  },
  {
    "uuid": "30cd1d0a-fe68-4e4f-b2a4-219c97300d4e",
    "name": "로컬호스트",
    "address": "localhost",
    "port": 14367
  }
];

const Root = () => {
  const [profileName, setProfileName] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPort, setServerPort] = useState("");
  const [securityKey, setSecurityKey] = useState("");

  const handlePortChange = (e) => {
    const { value } = e.target;
    const number = Number(value);

    if (value === "") {
      setServerPort(value);
      return;
    }

    if (number < 1 || number > 65535 || isNaN(number)) {
      return;
    }

    setServerPort(number);
  };

  return (
    <RootContainer>
      <Content>
        <ConnectSection $gap="32px">
          <FullLogo color="black" />

          <InputFieldContainer>
            <InputFieldBox label="프로파일 이름">
              <InputField value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </InputFieldBox>

            <InputFieldBox label="서버 주소와 포트">
              <InputField
                placeholder="localhost"
                value={serverAddress}
                onChange={(e) => setServerAddress(e.target.value)}
              />
              <Separator $width="1px" style={{ margin: "8px 0" }} />
              <InputField
                placeholder="8080"
                step="1"
                type="text"
                $width="50px"
                value={serverPort}
                onChange={handlePortChange}
              />
            </InputFieldBox>

            <InputFieldBox label="보안 키">
              <InputField
                placeholder="서버에서 발급된 보안 키 입력"
                type="password"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
              />
            </InputFieldBox>
          </InputFieldContainer>

          <ButtonContainer>
            <Link to="/settings">
              <Button icon={<CogIcon />} padding="12px 20px">
                설정
              </Button>
            </Link>

            <Button styleType="accent">프로파일 생성 후 연결</Button>
          </ButtonContainer>
        </ConnectSection>

        <Separator $width="2px" />

        <ConnectSection $gap="0px">
          <ProfileDataContainer>
            <ProfileDataLabel>프로파일로 연결</ProfileDataLabel>
            <EditProfilesButton tabIndex={0}>
              <CogIcon transform='scale(0.666666667)' />
              관리
            </EditProfilesButton>
          </ProfileDataContainer>
          <ProfilesContainer>
            {tempProfiles.map(({ name, address }, index) => (
              <ProfileItem
                key={index}
                name={name}
                address={address}
                showBorder={index > 0}
              />
            ))}
          </ProfilesContainer>
          <AddProfileButton icon={<PlusIcon />}>프로필 추가</AddProfileButton>
        </ConnectSection>
      </Content>
    </RootContainer>
  );
};

export default Root;

const ProfileItemBox = styled.div`
  display: flex;
  padding: 18px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  background: #FFF;
  ${({ $showBorder }) => $showBorder && 'border-top: 1px solid rgba(0, 0, 0, 0.10);'}
`

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
`

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
`

const ProfileItem = ({ name, address, showBorder }) => {
  return <ProfileItemBox $showBorder={showBorder}>
    <ProfileItemName>{name}</ProfileItemName>

    <ProfileItemAddress>{address}</ProfileItemAddress>

  </ProfileItemBox>;
}
