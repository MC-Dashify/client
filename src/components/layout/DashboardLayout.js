import styled from "styled-components";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ContentWrapper = styled.div`
  height: 100%;
  flex: 1;
  overflow: auto;
  padding: 42px;
`;

const DashboardLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Aside />

      <ContentWrapper>
        <Header />

        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
