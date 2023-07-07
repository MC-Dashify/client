import { useEffect } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import { XIcon } from '../../assets/16x-icons';
import FocusTrap from 'focus-trap-react';

const Backrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayerPopupBox = styled(motion.div)`
  z-index: 1100;
  padding: 42px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  max-width: 90vw;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const CloseIconButton = styled.button`
  padding: 6px;
  display: flex;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease-in;

  svg {
    opacity: 0.4;
  }

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 8px;

    &-track {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    &-thumb {
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
    }
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
`;

const LayerPopup = ({ title, children, footer, width, height, onClose }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  return (
    <FocusTrap>
      <Backrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2
        }}
        onClick={onClose}
      >
        <LayerPopupBox
          role='dialog'
          aria-modal={true}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.2
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            <HeaderTitle>{title}</HeaderTitle>

            <CloseIconButton onClick={onClose}>
              <XIcon />
            </CloseIconButton>
          </Header>

          <Content>{children}</Content>

          {footer && <Footer>{footer}</Footer>}
        </LayerPopupBox>
      </Backrop>
    </FocusTrap>
  );
};

const PopupSectionBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
`;

const SectionTitleDecoration = styled.div`
  flex: 1;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PopupSection = ({ title, children }) => {
  return (
    <PopupSectionBox>
      <SectionTitleWrapper>
        {title}
        <SectionTitleDecoration />
      </SectionTitleWrapper>
      {children}
    </PopupSectionBox>
  );
};

export default LayerPopup;
export { PopupSection };
