import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { styled } from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

import { platform } from '@tauri-apps/api/os';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

import { trapPauseState } from '../contexts/states';

import LayerPopup from '../components/common/LayerPopup';
import Button from '../components/common/Button';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const Update = ({ silent }) => {
  const setCurrentTrapPauseState = useSetRecoilState(trapPauseState);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [dialogType, setDialogType] = useState(0); // 0: 레이어팝업 표시 안함, 1: 새로운 버전 감지됨, 2: 설치 중

  const install = async () => {
    toast.dismiss('update-checking');
    const platformName = await platform();

    // 업데이트 설치 중 모달
    setDialogType(2);

    await installUpdate();

    if (platformName !== 'win32') {
      await relaunch();
    }
  };

  const update = async () => {
    try {
      setIsCheckingUpdate(true);
      toast.dismiss('update-latest');
      toast.loading('업데이트 확인중...', {
        id: 'update-checking'
      });

      const { shouldUpdate, manifest } = await checkUpdate();

      if (shouldUpdate) {
        setCurrentTrapPauseState({ settings: true });
        // You could show a dialog asking the user if they want to install the update here.
        console.log(
          `Latest Update Info: ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
        );

        setDialogType(1);
        toast.dismiss('update-checking');
      } else {
        // XXX toast.promise
        toast.dismiss('update-checking');
        toast.success('최신 버전입니다.', {
          id: 'update-latest'
        });
        console.log('No update available');
      }
    } catch (error) {
      console.error(error);
    }

    setCurrentTrapPauseState({ settings: false });
    setIsCheckingUpdate(false);
  };

  useEffect(() => {
    if (silent) update();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [silent])

  const NewVersionDetectedDialog = () => {
    return (
      <LayerPopup
        title='업데이트 발견'
      >
        업데이트를 설치하시겠습니까?
        <ButtonContainer>
          <Button
            styleType='accent'
            onClick={install}
          >
            설치
          </Button>
          <Button
            styleType='filled'
            onClick={() => setDialogType(0)}
          >
            나중에
          </Button>
        </ButtonContainer>
      </LayerPopup>
    )
  };

  const InstallDialog = () => {
    return (
      <LayerPopup title='업데이트 발견'>
        <div>
          업데이트 설치중
          <Button styleType='hidden' />
        </div>
      </LayerPopup>
    )
  };

  return (
    <>
      {
        !silent &&
        <Button
          padding={'8px 16px'}
          styleType='accent'
          onClick={async () => {
            if (isCheckingUpdate) return;
            await update();
          }}
        >
          업데이트 확인
        </Button>
      }
      <AnimatePresence mode=''>
        {(
          dialogType === 1 ? <NewVersionDetectedDialog/> :
          dialogType === 2 ? <InstallDialog /> : <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default Update;
