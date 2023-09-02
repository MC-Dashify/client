"use client";

import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import PageTransition from "@/components/layout/PageTransition";
import Aside from "@/components/layout/Aside";

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
        {/* TODO header */}

        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
