import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import LayerPopup, { PopupSection } from '../components/common/LayerPopup';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const goBackward = () => {
    if (location.key !== 'default') {
      // 이 페이지로 직접 접속하면 key가 default로 설정됩니다.
      // https://github.com/remix-run/react-router/discussions/9788#discussioncomment-4604278
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <AnimatePresence mode='' onExitComplete={goBackward}>
        {isModalOpen && (
          <LayerPopup title='설정' onClose={() => setIsModalOpen(false)}>
            <PopupSection title='계정'>
              <Button>로그아웃</Button>
            </PopupSection>
          </LayerPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
