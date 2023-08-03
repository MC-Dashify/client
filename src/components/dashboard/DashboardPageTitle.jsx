import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';

import { EyeIcon, SlashedEyeIcon } from '../../assets/32x-icons';
import Button from '../common/Button';

import AppData from '../../storage/data';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentProfileState,
  hideAddressState,
  refreshRateState
} from '../../contexts/states';

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

  color: ${({ theme }) => theme.text};

  &:hover,
  &:focus-visible {
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

const DashboardPageTitle = ({ reloadTask }) => {
  const autoRefreshOptions = [
    { label: '1초', value: 1000 },
    { label: '3초', value: 3000 },
    { label: '5초', value: 5000 },
    { label: '10초', value: 10000 },
    { label: '15초', value: 15000 },
    { label: '30초', value: 30000 },
    { label: '1분', value: 60000 }
  ];

  const setHideAddressFromProfileChanger = useSetRecoilState(hideAddressState);
  const [hideAddress, setHideAddress] = useState(
    AppData.get('settings.hide_address')
  );

  const toggleHideAddress = () => {
    AppData.set('settings.hide_address', !hideAddress);
    setHideAddress(!hideAddress);
    setHideAddressFromProfileChanger(!hideAddress);
  };

  const [refreshRate, setRefreshRate] = useState(
    AppData.get('settings.auto_refresh_rate')
  );

  useEffect(() => {
    setHideAddressFromProfileChanger(hideAddress);
  }, [hideAddress, setHideAddressFromProfileChanger]);

  const setGlobalRefreshRate = useSetRecoilState(refreshRateState);
  const currentProfile = useRecoilValue(currentProfileState);
  const currentRefreshRateOption =
    autoRefreshOptions.find((option) => option.value === refreshRate) ??
    autoRefreshOptions[4];

  const theme = useContext(ThemeContext)

  return (
    <Section>
      <TitleContainer>
        <TitleTextContainer>
          <Title>{currentProfile.name}</Title>
          {hideAddress ? null : <Address>({currentProfile.address})</Address>}
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
          defaultValue={currentRefreshRateOption}
          placeholder='주기 설정'
          onChange={(option) => {
            setRefreshRate(option.value);
            setGlobalRefreshRate(option.value);
            AppData.set('settings.auto_refresh_rate', option.value);
          }}
          styles={{
            control: (style) => ({
              ...style,
              background: 'transparent',
              border: 'none',
              height: '24px'
            }),
            menu: (style) => ({
              ...style,
              background: theme.input.bg
            }),
            option: (styles, { isFocused, isSelected }) => ({
              ...styles,
              color: theme.text,
              backgroundColor: isSelected ? theme.input.selectBg : theme.input.bg,
              '&:hover, &:active': { backgroundColor: theme.input.hoverBg }
            }),
            indicatorSeparator: () => ({
              display: 'none'
            }),
            singleValue: (style) => ({
              ...style,
              color: theme.input.text
            })
          }}
        />
        {/* TODO 이벤트 받아서 주기 설정(페이지별로 다르게) */}
      </AutoRefreshContainer>

      <Button
        styleType='outline'
        padding='8px 18px'
        onClick={() => reloadTask()}
      >
        지금 새로 고침하기
      </Button>
    </Section>
  );
};

export default DashboardPageTitle;
