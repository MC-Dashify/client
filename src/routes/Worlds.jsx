import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import { showModal } from '../utils/modal';

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

  gap: 12px;
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

const WorldContainer = styled.button`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  justify-content: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 24px;

  background-color: transparent;
  border: none;
  transition: background-color 0.2s ease-in;

  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05) ;
  }
`;

const UIDDisplay = styled.div`
  color: #000;
  font-size: 14px;
  font-family: 'JetBrains Mono';
  line-height: 100%;
  letter-spacing: -0.28px;
  opacity: 0.6;
`;

const NameDisplay = styled.div`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.48px;
`;

const WorldInfoContainer = ({ uuid, name, key }) => {
  return <WorldContainer key={key} onClick={() => {
    
    showModal(
      <WorldInfoModal uuid={uuid} name={name} />,
      '62.5rem'
    );
  }}>
    <UIDDisplay>{uuid}</UIDDisplay>
    <NameDisplay>{name}</NameDisplay>
  </WorldContainer>;
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  overflow: hidden;
`;

const ModalTopContainer = styled.div`
  display: flex;
  padding: 0px 0px 10px 0px;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  height: 34px;
`;

const WorldNameDisplay = styled.div`
  color: #000;
  font-size: 32px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.64px;
  width: 100%;
  text-align: left;
`;

const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 42px;
  flex: 1 0 0;
  align-self: stretch;
`;

const WorldInfoModal = ({ uuid, name }) => {
  return (
    <ModalContainer>
      <ModalTopContainer>
        <UIDDisplay style={{ opacity: 0.4, lineHeight: '14px' }}>{uuid}</UIDDisplay>
      </ModalTopContainer>
      <WorldNameDisplay>{name}</WorldNameDisplay>
      <ModalBodyContainer>
        <ModalHeading>상태</ModalHeading>
      </ModalBodyContainer>
    </ModalContainer>
  );
};

const ModalHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ModalHeadingTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.32px;
`;

const ModalHeadingSeparator = styled.div`
  width: 878px;
  height: 1px;
  opacity: 0.2;
  background: #000;
`;

const ModalHeading = ({ children }) => {
  return <ModalHeadingContainer>
    <ModalHeadingTitle>{children}</ModalHeadingTitle>
    <ModalHeadingSeparator />
  </ModalHeadingContainer>;
}

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
  const [selectedFilter, setSelectedFilter] = useState({ value: 'name', label: '이름' });
  const [searchValue, setSearchValue] = useState('');

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
                width: '98px',
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
              { value: 'uuid', label: 'UUID' },
            ]}
            components={{
              IndicatorSeparator: () => null,
            }}
            isSearchable={false}
            value={selectedFilter}
            onChange={(value) => setSelectedFilter(value)}
          />
          <Separator />
          <Searchbar placeholder='검색' onChange={(event) => {
            setSearchValue(event.target.value);
          }} value={searchValue} />
        </WorldsListBar>
        {tempWorldsData.worlds.filter(world => {
          if (selectedFilter.value === 'name') return world.name.includes(searchValue);
          if (selectedFilter.value === 'uuid') return world.uuid.replace(/-/g, '').includes(searchValue.replace(/-/g, ''));
          return true;
        }).map(({ uuid, name }, index) => (
          <WorldInfoContainer key={index} uuid={uuid} name={name} />
        ))}
      </WorldsListContainer>
    </WorldsContainer>
  );
};

export default Worlds;
