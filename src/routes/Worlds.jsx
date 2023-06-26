import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';

const WorldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const OverviewDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OverviewDataLabel = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.32px;
`;

const OverviewDataValueDisplay = styled.div`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.56px;
`;

const WorldsListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverviewData = ({ label, value }) => {
  return (
    <OverviewDataContainer>
      <OverviewDataLabel>{label}</OverviewDataLabel>
      <OverviewDataValueDisplay>{value}</OverviewDataValueDisplay>
    </OverviewDataContainer>
  );
};

const WorldsListBar = styled.div`
  display: flex;
  padding: 8px 20px 8px 0;
  align-items: center;
  gap: 14px;
  align-self: stretch;
  border-radius: 12px;
  background: #f7f7f7;

  height: 44px;
  box-sizing: border-box;

  width: 100%;
`;

const Separator = styled.div`
  width: 1px;
  align-self: stretch;
  opacity: 0.1;
  background: #000;
`;

const Searchbar = styled.input`
  width: 100%;

  color: #000;
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.176px;

  background-color: transparent;
  outline: none;
  border: none;

  &::placeholder {
    opacity: 0.6;
  }
`;

const tempWorldsData = {
  worlds: [
    { uuid: 'c8e62c4f-0882-404f-ba25-abfd4a19e07f', name: 'world' },
    { uuid: '045433dd-81d4-414c-af36-ae2b0fbea5ea', name: 'world_the_nether' },
    { uuid: '00d593bb-62d9-46cc-9edd-c81f829e97a1', name: 'world_the_end' },
    { uuid: 'a4037ad8-76b7-48a7-bfc1-24da5f773c3f', name: 'lobby' }
  ]
};

const Worlds = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  return (
    <WorldsContainer>
      <OverviewContainer>
        <OverviewData label='세계 개수' value={tempWorldsData.worlds.length} />
      </OverviewContainer>
      <WorldsListContainer>
        <WorldsListBar>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '12px',
                height: '44px',
                width: '94px',
                boxSizing: 'content-box',
                paddingLeft: '10px',

                color: '#000',
                textShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '-0.176px'
              }),
              option: (styles, { data, isFocused }) => ({
                ...styles,
                color: 'black',
                backgroundColor: (isFocused) ? '#e7e7e7' : '#f7f7f7',
                '&:hover, &:active': {
                  backgroundColor: '#e7e7e7'
                }
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: '#f7f7f7'
              })
            }}
            options={[
              { value: 'name', label: '이름' },
              { value: 'uid', label: 'UID' },
            ]}
            components={{
              IndicatorSeparator: () => null,
            }}
            isSearchable={false}
            defaultValue={{ value: 'name', label: '이름' }}
          />
          <Separator />
          <Searchbar placeholder='검색' />
        </WorldsListBar>
      </WorldsListContainer>
    </WorldsContainer>
  );
};

export default Worlds;
