import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import InputBox from "@/components/common/InputField";
import Button from "@/components/common/Button";
import CogIcon from "@/assets/icons-24x/Cog.svg";
import { useRouteRedirect } from "@/hooks/useRouteRedirect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputDivider = styled.div`
  width: 1px;
  background-color: currentColor;
  opacity: 0.2;
  margin: 12px 0;
  align-self: stretch;
`;

const AddressInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  gap: 12px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const ProfileCreateForm = ({ createButtonText }) => {
  const router = useRouter();
  const { redirect } = useRouteRedirect();

  const [profileName, setProfileName] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPort, setServerPort] = useState("");
  const [securityKey, setSecurityKey] = useState("");

  const handlePortChange = (e) => {
    const { value } = e.target;
    const number = Number(value);

    if (value === "") {
      setServerPort("");
      return;
    }

    if (number < 1 || number > 65535 || isNaN(number)) {
      return;
    }

    setServerPort(number);
  };

  return (
    <Container>
      <FormContainer>
        <InputBox label="프로필 이름">
          <input
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
        </InputBox>

        <AddressInputContainer>
          <InputBox label="서버 주소와 포트">
            <input
              placeholder="localhost"
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
            />

            <InputDivider />

            <input
              placeholder="8080"
              style={{ width: 100, flex: 0 }}
              value={serverPort}
              onChange={handlePortChange}
            />
          </InputBox>

          <CheckboxWrapper>
            <input type="checkbox" id="secure-connection" />
            <label htmlFor="secure-connection">보안 연결(HTTPS) 사용</label>
          </CheckboxWrapper>
        </AddressInputContainer>

        <InputBox label="보안 키">
          <input
            placeholder="서버에서 발급받은 보안 키 입력"
            value={securityKey}
            type="password"
            onChange={(e) => setSecurityKey(e.target.value)}
          />
        </InputBox>
      </FormContainer>

      <ButtonContainer>
        <Button
          variant="primary"
          onClick={() => {
            redirect("/dashboard/overview"); // XXX For test
          }}
        >
          {createButtonText || "프로필 생성"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProfileCreateForm;
