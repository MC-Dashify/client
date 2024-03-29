import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentProfileState, lastSentCommandsState } from '../contexts/states';
import Network from '../utils/net';
import ansiToElements from '../utils/ansi';

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
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: #2b2b2b;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);

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
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
`;

const CommandContainer = styled.div`
  display: flex;
  padding: 4px 0px 4px 6px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  div {
    font-family: ${({ theme }) => theme.font.mono};
    color: #cacaca;
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

  max-height: CALC(22.4px * 5);
  overflow-y: auto;

  &::after {
    content: attr(value) ' ';
    white-space: pre-wrap;
    visibility: hidden;
    flex: 1 0 0;
  }

  textarea,
  &::after {
    grid-area: 1 / 1 / 2 / 2;

    font-family: ${({ theme }) => theme.font.mono};
    font-size: 16px;
    font-weight: 400;
    word-break: break-all;
    line-height: 140%;
    letter-spacing: -0.176px;
  }
`;

const CommandInput = styled.textarea`
  color: #cacaca;
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
  align-self: stretch;

  span {
    color: #cacaca;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 14px;
    font-weight: 300;
    line-height: 140%;
    letter-spacing: -0.154px;
    word-break: break-all;
    white-space: pre-wrap;
  }
`;

const HiddenDownloadLink = styled.a`
  display: none;
`;

const downloadLogs = async (profile, invisibleAnchor, size) => {
  const logs = await Network.get(
    profile.address,
    profile.port,
    profile.key,
    profile.isSecureConnection,
    'logs?lines=' + size
  );

  console.log(logs.data);

  const blob = new Blob([logs.data.logs.join('\n')], {
    type: 'text/plain'
  });

  const element = invisibleAnchor.current;
  const url = URL.createObjectURL(blob);

  element.href = url;
  element.download = `logs-${size}.log`;

  element.click();

  URL.revokeObjectURL(url);
};

const Console = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [logs, setLogs] = useState([]);
  const [command, setCommand] = useState('');
  const [lastSentIndex, setLastSentIndex] = useState(0);
  const [sendCommand, setSendCommand] = useState(() => {});
  const currentProfile = useRecoilValue(currentProfileState);
  const [lastSent, setLastSent] = useRecoilState(lastSentCommandsState);

  const invisibleAnchor = useRef(undefined);
  const commandInput = useRef(undefined);

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  useEffect(() => {
    if (!currentProfile) return;

    const client = new WebSocket(
      `ws://${currentProfile.address}:${
        currentProfile.port
      }/console?auth_key=${encodeURIComponent(currentProfile.key)}`
    );

    client.addEventListener('open', async (event) => {
      console.log('Socket opened!');

      const loaded = await Network.get(
        currentProfile.address,
        currentProfile.port,
        currentProfile.key,
        currentProfile.isSecureConnection,
        'logs?lines=1000'
      );

      setLogs(loaded.data.logs);
    });

    client.addEventListener('close', (event) => {
      console.log('Socket closed!');
    });

    client.addEventListener('message', (event) => {
      setLogs((before) => [...before, event.data]);
    });

    setSendCommand(() => (message) => {
      message = message.replace(/\s+/g, ' ');
      if (client.readyState === WebSocket.OPEN) client.send(message);
      setLogs((before) => [...before, `> ${message}`]);
      setLastSent((last) =>
        last[last.length - 1] === message ? last : [...last, message]
      );
      setLastSentIndex(0);
    });

    return () => {
      setSendCommand(() => {});
      client.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile]);

  useEffect(() => {
    commandInput.current?.focus();
  }, [commandInput]);

  return (
    <ConsolePageContainer>
      <ButtonsContainer>
        <HiddenDownloadLink ref={invisibleAnchor} />
        <Button
          styleType='outline'
          onClick={() => downloadLogs(currentProfile, invisibleAnchor, 500)}
        >
          최근 로그 500줄 다운로드
        </Button>
        <Button
          styleType='outline'
          onClick={() => downloadLogs(currentProfile, invisibleAnchor, 1000)}
        >
          최근 로그 1,000줄 다운로드
        </Button>
      </ButtonsContainer>
      <ConsoleContainer>
        <LogsOuterContainer className='custom-scroll'>
          <LogsContainer>
            {logs.map((log, index) => (
              <LogLine key={index}>{ansiToElements(log)}</LogLine>
            ))}
          </LogsContainer>
        </LogsOuterContainer>
        <LogsSeparator />
        <CommandContainer>
          <CommandCaretContainer>{'>'}</CommandCaretContainer>
          <CommandInputContainer className='custom-scroll' value={command}>
            <CommandInput
              ref={commandInput}
              spellCheck={false}
              onChange={(event) => {
                setCommand(event.target.value);
              }}
              value={command}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (/[\S]/g.test(command)) sendCommand(command);
                  setCommand('');
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  const index = lastSentIndex + 1;
                  if (index > lastSent.length) return;
                  setLastSentIndex(index);
                  setCommand(lastSent[lastSent.length - index]);
                } else if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  const index = lastSentIndex - 1;
                  if (index < 1) return;
                  setLastSentIndex(index);
                  setCommand(lastSent[lastSent.length - index]);
                }
              }}
            />
          </CommandInputContainer>
        </CommandContainer>
      </ConsoleContainer>
    </ConsolePageContainer>
  );
};

export default Console;
