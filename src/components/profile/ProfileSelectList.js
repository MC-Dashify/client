import styled from "styled-components";
import Button from "@/components/common/Button";
import CogIcon from "@/assets/icons-24x/Cog.svg";
import PlusInCircleIcon from "@/assets/icons-24x/PlusInCircle.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
  height: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1 0 0;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  user-select: none;
`;

const ProfileList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  width: 400px;
  overflow: auto;
`;

const ProfileItemBox = styled.button`
  display: flex;
  flex-direction: column;
  padding: 18px 16px;
  font-size: inherit;
  gap: 6px;
  border: none;
  cursor: pointer;
  text-align: left;
  background-color: transparent;
  border-radius: 12px;
  position: relative;

  transition: background-color 0.1s ease-in-out;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.hover};

    &::after {
      opacity: 0;
    }
  }

  &:active {
    background-color: ${({ theme }) => theme.active};
  }

  &::after {
    content: "";
    background-color: ${({ theme }) => theme.divider.primary};
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: opacity 0.1s ease-in-out;
  }
`;

const ProfileItemName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ProfileItemAddressWrapper = styled.div`
  display: flex;
  font-size: 12px;
  opacity: 0.4;
  width: 100%;
`;

const ProfileItemAddress = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileItem = ({ name, address, port }) => {
  return (
    <ProfileItemBox>
      <ProfileItemName>{name}</ProfileItemName>

      <ProfileItemAddressWrapper>
        <ProfileItemAddress>{address}</ProfileItemAddress>:{port}
      </ProfileItemAddressWrapper>
    </ProfileItemBox>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileSelectList = () => {
  return (
    <Container>
      <ProfileSection>
        <SectionTitle>기존 프로필로 연결</SectionTitle>

        <ProfileList>
          <ProfileItem
            name="아름다운 마크 서버 #1아름다운 마크 서버 #1아름다운 마크 서버 #1"
            address="mc.hypixel.netmc.hypixel.netmc.hypixel.netmc.hypixel.netmc.hypixel.netmc.hypixel.net"
            port={25565}
          />
        </ProfileList>
      </ProfileSection>

      <ButtonContainer>
        <Button
          variant="tertiary"
          size="medium"
          style={{
            flex: 1,
          }}
        >
          <PlusInCircleIcon height={24} width={24} />
          프로필 추가
        </Button>

        <Button variant="tertiary" size="medium">
          <CogIcon height={24} width={24} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProfileSelectList;
