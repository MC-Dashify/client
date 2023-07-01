import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const Modal = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </Button>
    </div>
  );
};

export default Modal;
