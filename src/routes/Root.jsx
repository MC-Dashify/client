import { useContext, useEffect } from 'react';
import { styled, css, ThemeContext } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { platform } from '@tauri-apps/api/os';

import ProfileCreateForm from '../components/common/ProfileCreateForm';
import ProfileList from '../components/common/ProfileList';
import { currentProfileState } from '../contexts/states';

const modal = withReactContent(Swal);

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

  useEffect(() => {
    const sanstv = async () => {
      try {
        const { shouldUpdate, manifest } = await checkUpdate();

        if (shouldUpdate) {
          // You could show a dialog asking the user if they want to install the update here.
          console.log(
            `Latest Update Info: ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
          );

          modal
            .fire({
              icon: 'info',
              html: (
                <>
                  <h3>업데이트 발견</h3>
                  <p>업데이트를 설치할까요?</p>
                </>
              ),
              showConfirmButton: true,
              showCancelButton: true,
              allowEscapeKey: true,
              allowOutsideClick: false,
              confirmButtonText: '지금 업데이트',
              cancelButtonText: '나중에 업데이트',
              background: theme.modal.bg,
              color: theme.modal.text,
            })
            .then(async (result) => {
              console.log(result);
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                const platformName = await platform();

                modal.fire({
                  icon: 'loading',
                  html: (
                    <>
                      <h3>업데이트 설치중</h3>
                    </>
                  ),
                  showConfirmButton: false,
                  showCancelButton: false,
                  allowEscapeKey: false,
                  allowOutsideClick: false,
                  loading: true,
                  willOpen: () => {
                    modal.showLoading();
                  }
                });

                await installUpdate();

                if (platformName !== 'win32') {
                  await relaunch();
                }
              }
            });
        } else {
          console.log('No update available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    sanstv();
  }, []);

  return (
    <RootContainer>
      <Content>
        <ProfileCreateForm
          hasSettingButton
          submitButtonText='프로필 생성 후 연결'
          onAfterSubmit={() => navigate('/dashboard')}
        />

        <Separator $width='2px' />

        <ProfileList />
      </Content>
    </RootContainer>
  );
};

export default Root;
