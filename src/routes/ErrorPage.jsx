import { useRouteError } from 'react-router';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '../components/common/Button';
import { toast } from 'react-hot-toast';

const ErrorPage = () => {
  const error = useRouteError();
  const errorText = `${error.stack}`.replace(/\\n/g, '\n');

  const copyToClipboard = async () => {
    const { clipboard } = navigator;

    if (typeof clipboard == 'undefined') {
      toast.error(
        '복사에 실패했습니다. 브라우저가 복사 기능을 지원하지 않거나, 애플리케이션이 HTTPS로 연결되지 않았습니다.',
        { id: 'clipboard' }
      );
      return;
    }

    try {
      await clipboard.writeText(errorText);
      toast.success('복사되었습니다.', { id: 'clipboard' });
    } catch (e) {
      toast.error('복사에 실패했습니다.', { id: 'clipboard' });
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem',
        justifyContent: 'space-around',
        height: '100%'
      }}
    >
      <h1>에러가 났어용</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SyntaxHighlighter language='js' style={docco}>
          {errorText}
        </SyntaxHighlighter>

        <Button onClick={copyToClipboard}>
          <div>클립보드에 복사하기</div>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
