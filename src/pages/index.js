import styled from "styled-components";
const { version } = require("@/../package.json");

import LogoSymbol from "@/assets/logo/LogoSymbol.svg";
import LogoText from "@/assets/logo/LogoText.svg";
import ProfileCreateForm from "@/components/profile/ProfileCreateForm";
import ProfileSelectList from "@/components/profile/ProfileSelectList";
import LayoutForTransition from "@/components/layout/LayoutForTransition";
import IconButton from "@/components/common/IconButton";
import CogIcon from "@/assets/icons-24x/Cog.svg";

const Footer = styled.footer`
  display: flex;
  gap: 8px;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 16px;
`;

const AdditionalInfo = styled.span`
  font-size: 12px;
  opacity: 0.5;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  gap: 64px;
`;

const Divider = styled.div`
  width: 2px;
  background-color: ${({ theme }) => theme.divider.primary};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  min-width: 300px;
  max-width: 600px;
  width: 28vw;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Home = () => {
  return (
    <LayoutForTransition>
      <Footer>
        <IconButton>
          <CogIcon width={18} height={18} />
        </IconButton>

        <AdditionalInfo>
          v{version}
          {" | "}
          {/*
            THE PHRASE BELOW IS THE LEGAL SYNTAX for copyright notices
            and MUST NOT BE MODIFIED w/o full consultation with a team
            member on the project. Modifications made w/o consultation
            will force the change to be retracted.

            아래 문구는 저작권 표시를 위한 법적 구문이며, 프로젝트 팀원과의
            충분한 상의 없이 수정될 수 없습니다. 상의 없이 수정됐을 경우
            변경 사항이 강제로 철회됩니다.
          */}
          © 2023 Dashify.
        </AdditionalInfo>
      </Footer>

      <Center>
        <Container>
          <Section>
            <LogoContainer>
              <LogoSymbol width={40} height={40} />
              <LogoText width={142} height={40} />
            </LogoContainer>

            <ProfileCreateForm createButtonText="프로필 생성 및 연결" />
          </Section>

          <Divider />

          <Section>
            <ProfileSelectList />
          </Section>
        </Container>
      </Center>
    </LayoutForTransition>
  );
};

export default Home;
