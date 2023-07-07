import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo80, LogoText } from "../assets/logo";
import { styled } from "styled-components";
import Select from "react-select";
import { toast } from "react-hot-toast";

import Button from "../components/common/Button";
import LayerPopup, { PopupSection } from "../components/common/LayerPopup";
import AppData from "../storage/data";

import InstallPWA from "../hooks/pwa";

const WebsiteInfoContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 24px;
`;

const WebsiteInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  flex: 1 0 0;
`;

const WebsiteVersion = styled.div`
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.176px;
  opacity: 0.6;
`;

const SettingOptionContainer = styled.div`
  display: flex;
  padding: 18px 14px;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const SettingName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
`;

const SettingDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  opacity: 0.6;
`;

const SettingOption = ({ options, optionName, optionDescription }) => {
  const [value, setValue] = useState(options[0]);

  return (
    <SettingOptionContainer>
      <SettingInfo>
        <SettingName>{optionName}</SettingName>
        {optionDescription ? <SettingDescription>{optionDescription}</SettingDescription> : <></>}
      </SettingInfo>
      <Select
        styles={{
          control: () => ({
            display: "flex",
            border: "none",
            width: "175px",
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
        }}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        options={options}
        isSearchable={false}
      />
    </SettingOptionContainer>
  );
};

const SettingButton = ({ children, optionName, optionDescription, styleType, onClick }) => {
  return (
    <SettingOptionContainer>
      <SettingInfo>
        <SettingName>{optionName}</SettingName>
        {optionDescription ? <SettingDescription>{optionDescription}</SettingDescription> : <></>}
      </SettingInfo>
      <Button styleType={styleType} padding="8px 16px" onClick={onClick}>
        {children}
      </Button>
    </SettingOptionContainer>
  );
};

const ClearData = () => {
  console.log("asdf");
  AppData.clear();
  toast.success("모든 데이터가 삭제되었습니다.");
};

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const install = InstallPWA();

  const goBackward = () => {
    if (location.key !== "default") {
      // 이 페이지로 직접 접속하면 key가 default로 설정됩니다.
      // https://github.com/remix-run/react-router/discussions/9788#discussioncomment-4604278
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <AnimatePresence mode="" onExitComplete={goBackward}>
        {isModalOpen && (
          <LayerPopup
            width={"50rem"}
            title="설정"
            onClose={() => setIsModalOpen(false)}
            footer={<div> © 2023 "Dashify" Development Team</div>}
          >
            <WebsiteInfoContainer>
              <Logo80 background="black" foreground="white" />
              <WebsiteInfo>
                <LogoText />
                <WebsiteVersion>v{AppData.get("etc.version")}</WebsiteVersion>
              </WebsiteInfo>
              <Button
                padding={"8px 16px"}
                styleType="filled"
                onClick={() => {
                  window.open("https://github.com/MC-Dashify", "_blank");
                }}
              >
                GitHub 리포지토리 방문
              </Button>
              <Button padding={"8px 16px"} styleType="accent">
                업데이트 확인
              </Button>
            </WebsiteInfoContainer>
            {/* <PopupSection title="외관" gap="0" titleMargin="18px">
              <SettingOption
                optionName="표시 언어(Language)"
                optionDescription="Dashify에 표시될 언어입니다."
                options={[{ value: "korean", label: "한국어(Korean)" }]}
              />
              <SettingOption
                optionName="테마"
                options={[
                  { value: "system", label: "시스템 설정과 연동" },
                  { value: "dark", label: "다크" },
                  { value: "light", label: "라이트" },
                ]}
              />
            </PopupSection> */}
            <PopupSection title="애플리케이션" gap="0" titleMargin="18px">
              <SettingButton
                optionName="애플리케이션 설치"
                optionDescription="Dashify을 디바이스에 설치합니다."
                styleType="filled"
                onClick={install}
              >
                설치
              </SettingButton>
              <SettingButton
                optionName="모든 데이터 삭제"
                optionDescription="Dashify에 저장된 모든 로컬 데이터(프로파일 등)을 삭제합니다."
                styleType="warning"
                onClick={ClearData}
              >
                데이터 삭제
              </SettingButton>
            </PopupSection>
          </LayerPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
