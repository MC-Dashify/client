import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../components/common/Button';

const ConsolePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1 0 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const ConsoleContainer = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  align-self: stretch;

  border-radius: 22px;
  border: 2px solid rgba(0, 0, 0, 0.10);
  background: #2B2B2B;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.10);

  flex: 1 0 0;
`;

const LogsOuterContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-self: stretch;
  overflow-y: auto;
  flex: 1 0 0;
`;

const LogsContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const LogsSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.20);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
`;

const CommandContainer = styled.div`
  display: flex;
  padding: 4px 6px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  div {
    font-family: 'JetBrains Mono';
    color: #CACACA;
  }
`;

const CommandCaretContainer = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 22.4px;
  letter-spacing: -0.154px;
  opacity: 0.4;
`;

const CommandInputContainer = styled.div`
  display: grid;
  flex: 1 0 0;

  max-height: CALC(22.4px * 6);
  overflow-y: auto;

  &::after {
    content: attr(value) ' ';
    white-space: pre-wrap;
    visibility: hidden;
    flex: 1 0 0;
  }

  textarea, &::after {
    grid-area: 1 / 1 / 2 / 2;

    font-family: 'JetBrains Mono';
    font-size: 16px;
    font-weight: 400;
    word-break: break-all;
    line-height: 140%;
    letter-spacing: -0.176px;
  }
`;

const CommandInput = styled.textarea`
  color: #CACACA;
  overflow: hidden;
  padding: 0;
  background-color: transparent;

  flex: 1 0 0;
  height: auto;  
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const LogLine = styled.div`
  display: flex;
  padding: 4px 6px;
  gap: 10px;
  align-self: stretch;
  
  color: #CACACA;
  font-family: 'JetBrains Mono';
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: -0.154px;
`;

const Console = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [logs, setLogs] = useState([]);
  const [command, setCommand] = useState('');

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  useEffect(() => {
    setLogs((new Array(20)).fill(
      '[23:39:52] [Server thread/INFO]: Entity Tracking Range: Pl 48 / An 48 / Mo 48 / Mi 32 / Other 64'
    ));
  }, []);

  return <ConsolePageContainer>
    <ButtonsContainer>
      <Button styleType='outline'>최근 로그 500줄 다운로드</Button>
      <Button styleType='outline'>최근 로그 1,000줄 다운로드</Button>
    </ButtonsContainer>
    <ConsoleContainer>
      <LogsOuterContainer>
        <LogsContainer>
          {logs.map((log, index) => <LogLine key={index}>{log}</LogLine>)}
        </LogsContainer>
      </LogsOuterContainer>
      <LogsSeparator />
      <CommandContainer>
        <CommandCaretContainer>{'>'}</CommandCaretContainer>
        <CommandInputContainer value={command}>
          <CommandInput spellCheck={false} onChange={(event) => { setCommand(event.target.value) }} value={command} />
        </CommandInputContainer>
      </CommandContainer>
    </ConsoleContainer>
  </ConsolePageContainer>;
};

export default Console;
