import { styled, css } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { useNavigate } from 'react-router-dom';

import ProfileCreateForm from '../components/common/ProfileCreateForm';
import ProfileList from '../components/common/ProfileList';

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

const Root = () => {
  const navigate = useNavigate();

  return (
    <RootContainer>
      <RecoilRoot>
        <Content>
          <ProfileCreateForm
            hasSettingButton
            submitButtonText='프로필 생성 후 연결'
            onAfterSubmit={() => navigate('/dashboard')}
          />

          <Separator $width='2px' />

          <ProfileList />
        </Content>
      </RecoilRoot>
    </RootContainer>
  );
};

export default Root;
