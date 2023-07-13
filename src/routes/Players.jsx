import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import styled from 'styled-components';
import Searchbar from '../components/common/Searchbar';
import { BanIcon, KickIcon } from '../assets/24x-icons';
import {
  currentProfileState,
  playerDetailState,
  playersState
} from '../contexts/states';
import { useRecoilState, useRecoilValue } from 'recoil';
import Network from '../utils/net';
import { toast } from 'react-hot-toast';

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const PlayersListContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 32px;
  align-items: center;
  align-self: stretch;
  border-radius: 24px;

  gap: 18px;

  background-color: transparent;
  transition: background-color 0.2s ease-in;
`;

const HeadDisplay = styled.div`
  display: flex;
  width: 46px;
  height: 46px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  background: url(${({ $src }) => $src}?size=46),
    lightgray 50% / contain no-repeat;
`;

const PlayerDataDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: flex-start;
  ${({ $extraStyle }) => $extraStyle}
`;

const PlayerDataTopDisplay = styled.div`
  color: #000;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.28px;
  opacity: 0.6;
  ${({ $useMonospacedFont }) =>
    $useMonospacedFont && "font-family: 'JetBrains Mono';"}
`;

const PlayerDataBottomDisplay = styled.div`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.48px;
`;

const PlayerDataDisplay = ({
  topText,
  bottomText,
  extraStyle = 'flex: 1 0 0;',
  useMonospacedFont = false
}) => (
  <PlayerDataDisplayContainer $extraStyle={extraStyle}>
    <PlayerDataTopDisplay $useMonospacedFont={useMonospacedFont}>
      {topText}
    </PlayerDataTopDisplay>
    <PlayerDataBottomDisplay>{bottomText}</PlayerDataBottomDisplay>
  </PlayerDataDisplayContainer>
);

const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const PlayerButton = styled.button`
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid rgba(216, 65, 58, 0.2);
  background-color: rgba(216, 65, 58, 0);
  cursor: pointer;

  svg {
    color: #d8413a;
  }

  &:hover,
  &:focus-visible {
    border: 1px solid transparent;
    background-color: rgba(216, 65, 58, 0.2);
    outline: none;
  }

  &:active {
    border: 1px solid rgba(216, 65, 58, 0.2);
    background: #d8413a;
  }

  &:active svg {
    color: #fff;
  }
`;

const PlayerInfoContainer = ({ uuid, name }) => {
  const [playerDetails, setPlayerDetails] = useRecoilState(playerDetailState);
  const player = playerDetails[uuid]?.data;
  const profile = useRecoilValue(currentProfileState);

  return player ? (
    <PlayerContainer>
      <HeadDisplay $src={`${player.avatar}/46.png`} />
      <PlayerDataDisplay
        topText={uuid}
        bottomText={name}
        useMonospacedFont={true}
      />
      <PlayerDataDisplay
        topText='사용하는 클라이언트'
        bottomText={player.clientBrandName}
        extraStyle='width: 360px;'
      />
      <PlayerDataDisplay
        topText='핑(ms)'
        bottomText={player.ping}
        extraStyle='width: 140px;'
      />
      <ButtonsContainer>
        <PlayerButton
          onClick={async () => {
            await Network.set(
              profile.address,
              profile.port,
              profile.key,
              profile.isSecureConnection,
              `players/${uuid}/kick`,
              { reason: 'Reason' }
            );

            setPlayerDetails((details) => ({
              ...details,
              [uuid]: undefined
            }));

            toast.success(`${name}을(를) 추방했습니다!`);
          }}
        >
          <KickIcon />
        </PlayerButton>
        <PlayerButton
          onClick={async () => {
            await Network.set(
              profile.address,
              profile.port,
              profile.key,
              profile.isSecureConnection,
              `players/${uuid}/ban`,
              { reason: 'Reason' }
            );

            setPlayerDetails((details) => ({
              ...details,
              [uuid]: undefined
            }));

            toast.success(`${name}을(를) 밴했습니다!`);
          }}
        >
          <BanIcon />
        </PlayerButton>
      </ButtonsContainer>
    </PlayerContainer>
  ) : (
    <></>
  );
};

const Players = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [selectedValue, setSelectedValue] = useState({
    value: 'name',
    label: '이름'
  });
  const [searchValue, setSearchValue] = useState('');
  const players = useRecoilValue(playersState);

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침

    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  return (
    <PlayersContainer>
      <DashboardSummary label='플레이어 수' value={players.length} />
      <PlayersListContainer>
        <Searchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          options={[
            { value: 'name', label: '이름' },
            { value: 'uuid', label: 'UUID' }
          ]}
        />
        {players
          .filter((player) => {
            if (selectedValue.value === 'name')
              return player.name.toLowerCase().includes(searchValue);
            if (selectedValue.value === 'uuid')
              return player.uuid
                .toLowerCase()
                .replace(/-/g, '')
                .includes(searchValue.replace(/-/g, ''));
            return true;
          })
          .map(({ uuid, name }, index) => (
            <PlayerInfoContainer key={index} uuid={uuid} name={name} />
          ))}
      </PlayersListContainer>
    </PlayersContainer>
  );
};

export default Players;
