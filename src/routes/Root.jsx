import { useContext, useEffect } from 'react';
import { styled, css, ThemeContext } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import ProfileCreateForm from '../components/common/ProfileCreateForm';
import ProfileList from '../components/common/ProfileList';
import { currentProfileState } from '../contexts/states';

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
  background-color: ${({ theme }) => theme.divider.primary};
  border-radius: 1px;

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

const Root = () => {
  const navigate = useNavigate();
  const setCurrentProfile = useSetRecoilState(currentProfileState);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setCurrentProfile({});
  });

  return (
    <RootContainer>
      <Content>
        <ProfileCreateForm
          hasSettingButton
          submitButtonText='프로필 생성 후 연결'
          onAfterSubmit={() => navigate('/dashboard')}
        />

        <Separator $width='2px' />

        <ProfileList theme={theme} />
      </Content>
    </RootContainer>
  );
};

export default Root;
