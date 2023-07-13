import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { showModal } from '../utils/modal';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import Searchbar from '../components/common/Searchbar';
import { worldsState, worldDetailState } from '../contexts/states';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue
} from 'recoil';
import { Toaster } from 'react-hot-toast';

const WorldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WorldsListContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
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
    background-color: rgba(0, 0, 0, 0.05);
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

const WorldInfoContainer = ({ uuid, name }) => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <WorldContainer
      onClick={() => {
        showModal(
          <RecoilBridge>
            <WorldInfoModal uuid={uuid} name={name} />
            <Toaster position='bottom-center' style={{ zIndex: '20' }} />
          </RecoilBridge>,
          '62.5rem'
        );
      }}
    >
      <UIDDisplay>{uuid}</UIDDisplay>
      <NameDisplay>{name}</NameDisplay>
    </WorldContainer>
  );
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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

const ModalStatsContainer = styled.div`
  display: flex;
  padding: 36px 40px;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;

  border-radius: 24px;
  background: #fdfdfd;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05) inset;

  width: 100%;
`;

const ModalGamerulesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
`;

const ModalGamerulesInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  ${({ $noFlex }) => !$noFlex && 'flex: 1 0 0'};
`;

const ModalGamerulesSeparator = styled.div`
  width: 1px;
  height: 18px;
  opacity: 0.2;
  background-color: #000;
`;

const WorldInfoModal = ({ uuid, name }) => {
  const [rightGamerules, setRightGamerules] = useState([]);
  const [leftGamerules, setLeftGamerules] = useState([]);
  const worldDetails = useRecoilValue(worldDetailState);
  const world = worldDetails[uuid].data;

  useEffect(() => {
    const right = Object.keys(world.gamerule);
    const left = right.splice(right.length / 2);

    setLeftGamerules(left);
    setRightGamerules(right);
  }, [world]);
  return (
    <ModalContainer>
      <ModalTopContainer>
        <UIDDisplay style={{ opacity: 0.4, lineHeight: '14px' }}>
          {uuid}
        </UIDDisplay>
      </ModalTopContainer>
      <WorldNameDisplay>{name}</WorldNameDisplay>
      {world ? (
        <ModalBodyContainer>
          <ModalHeading>상태</ModalHeading>
          <ModalStatsContainer>
            <ModalStatsDisplay name='크기' value={world.size} />
            <ModalStatsDisplay name='엔티티 개수' value={world.entities} />
            <ModalStatsDisplay name='플레이어 수' value={world.player} />
            <ModalStatsDisplay
              name='불러운 청크 수'
              value={world.loadedChunks}
            />
          </ModalStatsContainer>
          <ModalHeading>설정</ModalHeading>
          <ModalStatsContainer>
            <ModalStatsDisplay name='난이도' value={world.difficulty} />
          </ModalStatsContainer>
          <ModalHeading>게임규칙</ModalHeading>
          <ModalGamerulesContainer>
            <ModalGamerulesInnerContainer>
              {leftGamerules.map((gamerule, index) => (
                <GameruleDisplay
                  key={index}
                  name={gamerule}
                  value={world.gamerule[gamerule]}
                />
              ))}
            </ModalGamerulesInnerContainer>
            <ModalGamerulesInnerContainer $noFlex>
              {leftGamerules.map((_, index) => (
                <ModalGamerulesSeparator key={index} />
              ))}
            </ModalGamerulesInnerContainer>
            <ModalGamerulesInnerContainer>
              {rightGamerules.map((gamerule, index) => (
                <GameruleDisplay
                  key={index}
                  name={gamerule}
                  value={world.gamerule[gamerule]}
                />
              ))}
            </ModalGamerulesInnerContainer>
          </ModalGamerulesContainer>
        </ModalBodyContainer>
      ) : (
        <WorldNameDisplay>월드 정보를 불러오지 못했습니다</WorldNameDisplay>
      )}
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
  flex: 1 0;
  height: 1px;
  opacity: 0.2;
  background: #000;
`;

const ModalHeading = ({ children }) => {
  return (
    <ModalHeadingContainer>
      <ModalHeadingTitle>{children}</ModalHeadingTitle>
      <ModalHeadingSeparator />
    </ModalHeadingContainer>
  );
};

const ModalStatsDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
`;

const ModalStatsNameDisplay = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.32px;
`;

const ModalStatsValueDisplay = styled.div`
  color: #000;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.56px;
`;

const ModalStatsDisplay = ({ name, value }) => (
  <ModalStatsDisplayContainer>
    <ModalStatsNameDisplay>{name}</ModalStatsNameDisplay>
    <ModalStatsValueDisplay>{value}</ModalStatsValueDisplay>
  </ModalStatsDisplayContainer>
);

const GameruleDisplayContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const GameruleNameDisplay = styled.div`
  color: #000;
  font-size: 18px;
  font-family: JetBrains Mono;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.36px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  text-overflow: ellipsis;

  flex: 1 0 0;
  text-align: left;
`;

const GameruleValueDisplay = styled.div`
  color: ${({ $color }) => $color};
  font-size: 18px;
  font-family: JetBrains Mono;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.36px;
  width: 128px;
  text-align: left;
`;

const GameruleDisplay = ({ name, value }) => {
  return (
    <GameruleDisplayContainer>
      <GameruleNameDisplay>{name}</GameruleNameDisplay>
      <GameruleValueDisplay
        $color={
          typeof value === 'boolean' ? (value ? '#338EE2' : '#D04038') : '#000'
        }
      >{`${value}`}</GameruleValueDisplay>
    </GameruleDisplayContainer>
  );
};

const Worlds = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [selectedFilter, setSelectedFilter] = useState({
    value: 'name',
    label: '이름'
  });
  const [searchValue, setSearchValue] = useState('');
  const worlds = useRecoilValue(worldsState);

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  return (
    <WorldsContainer>
      <OverviewContainer>
        <DashboardSummary label='세계 개수' value={worlds.length} />
      </OverviewContainer>
      <WorldsListContainer>
        <Searchbar
          selectedValue={selectedFilter}
          setSelectedValue={setSelectedFilter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          options={[
            { value: 'name', label: '이름' },
            { value: 'uuid', label: 'UUID' }
          ]}
        />
        {worlds
          .filter((world) => {
            if (selectedFilter.value === 'name')
              return world.name.toLowerCase().includes(searchValue);
            if (selectedFilter.value === 'uuid')
              return world.uuid
                .toLowerCase()
                .replace(/-/g, '')
                .includes(searchValue.replace(/-/g, ''));
            return true;
          })
          .map(({ uuid, name }, index) => (
            <WorldInfoContainer key={index} uuid={uuid} name={name} />
          ))}
      </WorldsListContainer>
    </WorldsContainer>
  );
};

export default Worlds;
