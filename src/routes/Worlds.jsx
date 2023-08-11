import { useContext, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import LayerPopup, { PopupSection } from '../components/common/LayerPopup';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import Searchbar from '../components/common/Searchbar';
import { worldsState } from '../contexts/states';
import { useRecoilValue } from 'recoil';

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
    background-color: rgba(0, 0, 0, 0.05); // TODO: theme
  }
`;

const UIDDisplay = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-family: ${({theme}) => theme.font.mono};
  line-height: 100%;
  letter-spacing: -0.28px;
  opacity: 0.6;
`;

const NameDisplay = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.48px;
`;

const WorldInfoContainer = ({ uuid, name, onClick }) => {
  return (
    <>
      <WorldContainer
        onClick={onClick}
      >
        <UIDDisplay>{uuid}</UIDDisplay>
        <NameDisplay>{name}</NameDisplay>
        
      </WorldContainer>
    </>
  );
};

const ModalStatsContainer = styled.div`
  display: flex;
  padding: 36px 40px;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;

  border-radius: 24px;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05) inset;

  background-color: ${({ theme }) => theme.modal.container.bg};

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
  background-color: ${({ theme }) => theme.modal.separator};
`;

const WorldInfoModal = ({ uuid, isOpen, setIsOpen }) => {
  const [rightGamerules, setRightGamerules] = useState([]);
  const [leftGamerules, setLeftGamerules] = useState([]);
  const worlds = useRecoilValue(worldsState);
  const world = worlds[uuid];

  useEffect(() => {
    if (!world) return
    const right = Object.keys(world.gamerule);
    const left = right.splice(right.length / 2);

    setLeftGamerules(left);
    setRightGamerules(right);
  }, [world]);

  return (
    <AnimatePresence mode=''>
      {isOpen &&
        <LayerPopup
          title={world.name}
          onClose={() => setIsOpen(false)}
          footer={<div>{uuid}</div>}
        >
          <PopupSection title='상태' gap='0' titleMargin='18px'>
            <ModalStatsContainer>
              <ModalStatsDisplay name='크기' value={world.size} />
              <ModalStatsDisplay name='엔티티 개수' value={world.entities} />
              <ModalStatsDisplay name='플레이어 수' value={world.player} />
              <ModalStatsDisplay
                name='불러운 청크 수'
                value={world.loadedChunks}
              />
            </ModalStatsContainer>
          </PopupSection>

          <PopupSection title='설정' gap='0' titleMargin='18px'>
            <ModalStatsContainer>
              <ModalStatsDisplay name='난이도' value={world.difficulty} />
            </ModalStatsContainer>
          </PopupSection>

          <PopupSection title='게임 규칙' gap='0' titleMargin='18px'>
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
          </PopupSection>

        </LayerPopup>
      }
    </AnimatePresence>
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.32px;
`;

const ModalStatsValueDisplay = styled.div`
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
  font-size: 18px;
  font-family: ${({theme}) => theme.font.mono};
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
  font-family: ${({theme}) => theme.font.mono};
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.36px;
  width: 128px;
  text-align: left;
`;

const GameruleDisplay = ({ name, value }) => {
  const theme = useContext(ThemeContext);

  return (
    <GameruleDisplayContainer>
      <GameruleNameDisplay>{name}</GameruleNameDisplay>
      <GameruleValueDisplay
        $color={
          typeof value === 'boolean' ? (value ? '#338EE2' : '#D04038') : theme.modal.text
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
  const worldDetails = useRecoilValue(worldsState);
  const worlds = useMemo(() => Object.values(worldDetails), [worldDetails]);

  const [isOpen, setIsOpen] = useState(false);
  const [uuid, setUuid] = useState(null);

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
        <WorldInfoModal uuid={uuid} isOpen={isOpen} setIsOpen={setIsOpen}/>
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
            <WorldInfoContainer
              key={index}
              uuid={uuid}
              name={name}
              onClick={() => {
                setUuid(uuid)
                setIsOpen(true)
              }}
            />
          ))}
      </WorldsListContainer>
    </WorldsContainer>
  );
};

export default Worlds;
