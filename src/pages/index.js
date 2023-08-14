import styled from "styled-components";

import LogoSymbol from "@/assets/logo/LogoSymbol.svg";
import LogoText from "@/assets/logo/LogoText.svg";
import ProfileCreateForm from "@/components/profile/ProfileCreateForm";
import ProfileSelectList from "@/components/profile/ProfileSelectList";
import PageLayout from "@/components/layout/PageLayout";

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
  width: 400px;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Home = () => {
  return (
    <PageLayout>
      <Center>
        <Container>
          <Section>
            <LogoContainer>
              <LogoSymbol width={40} height={40} />
              <LogoText width={142} height={40} />
            </LogoContainer>

            <ProfileCreateForm />
          </Section>

          <Divider />

          <Section>
            <ProfileSelectList />
          </Section>
        </Container>
      </Center>
    </PageLayout>
  );
};

export default Home;
