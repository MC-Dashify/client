import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import { EyeIcon, SlashedEyeIcon } from '../../assets/32x-icons';
import Button from '../common/Button';

import AppData from '../../storage/data';

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  margin-bottom: 32px;
  position: sticky;
  left: 0;
  z-index: 100;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const TitleTextContainer = styled.div`
  line-height: 100%;
  width: max-content;
`;

const Title = styled.h1`
  display: inline-block;
  font-size: 42px;
  font-weight: 700;
  margin: 0;
`;

const Address = styled.h3`
  display: inline-block;
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  margin-left: 10px;
`;

const AddressHideIconButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.4s ease;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const AutoRefreshContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

const AutoRefreshLabel = styled.span`
  opacity: 0.6;
`;

const DashboardPageTitle = ({ refreshFn }) => {
  const autoRefreshOptions = [
    { label: '1초', value: 1 },
    { label: '3초', value: 3 },
    { label: '5초', value: 5 },
    { label: '10초', value: 10 },
    { label: '15초', value: 15 },
    { label: '30초', value: 30 },
    { label: '1분', value: 60 }
  ];

  const [hideAddress, setHideAddress] = useState(
    AppData.get('settings.hide_address')
  );

  const toggleHideAddress = () => {
    AppData.set('settings.hide_address', !hideAddress);
    setHideAddress(!hideAddress);
  };

  return (
    <Section>
      <TitleContainer>
        <TitleTextContainer>
          <Title>하이픽셀</Title>
          {hideAddress ? null : <Address>(hypixel.net)</Address>}
        </TitleTextContainer>

        <AddressHideIconButton
          onClick={toggleHideAddress}
          data-tooltip-id='dashify__tooltip'
          data-tooltip-content={
            hideAddress ? '앱에서 주소 표시하기' : '앱에서 주소 숨기기'
          }
        >
          {hideAddress ? <EyeIcon /> : <SlashedEyeIcon />}
        </AddressHideIconButton>
      </TitleContainer>

      <AutoRefreshContainer>
        <AutoRefreshLabel>새로 고침 주기</AutoRefreshLabel>

        <Select
          isSearchable={false}
          options={autoRefreshOptions}
          defaultValue={autoRefreshOptions[4]}
          placeholder='주기 설정'
        />
        {/* TODO 이벤트 받아서 주기 설정(페이지별로 다르게) */}
      </AutoRefreshContainer>

      <Button styleType='outline' padding='8px 18px' onClick={refreshFn}>
        지금 새로 고침하기
      </Button>
    </Section>
  );
};

export default DashboardPageTitle;
