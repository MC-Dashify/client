import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../components/common/Button";
import { useRecoilValue } from "recoil";
import { currentProfileState } from "../contexts/states";
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
    font-family: "JetBrains Mono";
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
    content: attr(value) " ";
    white-space: pre-wrap;
    visibility: hidden;
    flex: 1 0 0;
  }

  textarea,
  &::after {
    grid-area: 1 / 1 / 2 / 2;

    font-family: "JetBrains Mono";
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
  gap: 10px;
  align-self: stretch;

  color: #cacaca;
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: -0.154px;
`;

const Console = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [logs, setLogs] = useState([]);
  const [command, setCommand] = useState("");
  const [sendCommand, setSendCommand] = useState(() => {});
  const currentProfile = useRecoilValue(currentProfileState);

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log("refreshed"));
  }, [setRefreshFn]);

  useEffect(() => {
    if (!currentProfile) return;
    
    const client = new WebSocket(`ws://${currentProfile.address}:${currentProfile.port}/console?auth_key=${encodeURIComponent(currentProfile.key)}`);

    client.addEventListener("open", (event) => {
      console.log("Socket opened!");
    });

    client.addEventListener("close", (event) => {
      console.log("Socket closed!");
    });

    client.addEventListener("message", (event) => {
      console.log('adding ', event.data, ' to ', logs);
      setLogs((before) => [...before, event.data]);
    });

    setSendCommand(() => ((message) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
      setLogs((before) => [...before, `> ${message}`]);
    }));
    
    return () => {
      setSendCommand(() => {});
      client.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile]);

  return (
    <ConsolePageContainer>
      <ButtonsContainer>
        <Button styleType="outline">최근 로그 500줄 다운로드</Button>
        <Button styleType="outline">최근 로그 1,000줄 다운로드</Button>
      </ButtonsContainer>
      <ConsoleContainer>
        <LogsOuterContainer className="custom-scroll">
          <LogsContainer>
            {logs.map((log, index) => (
              <LogLine key={index}>{ansiToElements(log)}</LogLine>
            ))}
          </LogsContainer>
        </LogsOuterContainer>
        <LogsSeparator />
        <CommandContainer>
          <CommandCaretContainer>{">"}</CommandCaretContainer>
          <CommandInputContainer className="custom-scroll" value={command}>
            <CommandInput
              spellCheck={false}
              onChange={(event) => {
                setCommand(event.target.value);
              }}
              value={command}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (!event.shiftKey) {
                    event.preventDefault();
                    if (command !== "") sendCommand(command);
                    setCommand("");
                  }
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
