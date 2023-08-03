import { AnimatePresence } from 'framer-motion';
import LayerPopup from '../components/common/LayerPopup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Network from '../utils/net';
import { currentProfileState } from '../contexts/states';
import { useRecoilState } from 'recoil';
import AppData from '../storage/data';
import { useNavigate } from 'react-router-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '../components/common/Button';

const Connection = ({ profile, child: Child }) => {
  const [dialogType, setDialogType] = useState(0); // 0: 레이어팝업 표시 안함, 1: 일반적인 오류, 2: Dashify 비활성화
  const [error, setError] = useState('');
  const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState);

  const navigate = useNavigate();

  const copyToClipboard = async (text) => {
    const { clipboard } = navigator;

    if (typeof clipboard == 'undefined') {
      toast.error(
        '복사에 실패했습니다. 브라우저가 복사 기능을 지원하지 않거나, 애플리케이션이 HTTPS로 연결되지 않았습니다.',
        { id: 'clipboard' }
      );
      return;
    }

    try {
      await clipboard.writeText(text);
      toast.success('복사되었습니다.', { id: 'clipboard' });
    } catch (e) {
      toast.error('복사에 실패했습니다.', { id: 'clipboard' });
    }
  };

  const connect = (onSuccess) => {
    toast.loading('서버에 연결 중입니다...', {
      id: 'profile-connecting'
    });

    Network.ping(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection
    ).then((res) => {
      if (res.status === 200) {
        toast.dismiss();
        setCurrentProfile(profile);
        AppData.set('etc.last_profile', profile.uuid);
        navigate('/dashboard');

        if (onSuccess) onSuccess(profile)
      }
    }).catch((err) => {
      toast.dismiss();
      if (err?.response?.status === 418) {
        return setDialogType(2);
      }

      setDialogType(1);
      setError(`${err.stack}`.replace(/\\n/g, '\n'));
    });
  };

  const CommonError = () => {
    return (
      <LayerPopup
        title='연결 실패'
        onClose={() => setDialogType(0)}
      >
        <SyntaxHighlighter language='js' style={docco}>
          {error}
        </SyntaxHighlighter>

        <Button
          styleType='accent'
          onClick={() => {
            copyToClipboard(error);
            setDialogType(0);
          }}
        >
          클립보드에 복사하기
        </Button>
      </LayerPopup>
    );
  }

  const DashifyDisabledError = () => {
    return (
      <LayerPopup
        title='연결 실패'
        onClose={() => setDialogType(0)}
      >
        서버가 Dashify를 비활성화 하였습니다.

        <Button
          styleType='accent'
          onClick={() => setDialogType(0)}
        >
          닫기
        </Button>
      </LayerPopup>
    )
  }

  console.log(!Child)
  return (
    <>
      {Child && <Child onClick={connect} />}
      <AnimatePresence mode=''>
        {(
          dialogType === 1 ? <CommonError /> :
          dialogType === 2 ? <DashifyDisabledError /> : <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default Connection;
