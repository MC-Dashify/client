import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import {
  BanIcon,
  ReceiveIcon,
  SendAndReceiveIcon,
  SendIcon
} from '../assets/24x-icons';
import Chart from '../components/common/Chart';
import { Line } from 'react-chartjs-2';
import Searchbar from '../components/common/Searchbar';
import { useRecoilValue } from 'recoil';
import { trafficState } from '../contexts/states';
import LayerPopup from '../components/common/LayerPopup';
import { AnimatePresence } from 'framer-motion';

const TrafficContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;
  flex: 1 0 0;
`;

const PageSummaryContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4rem;
  align-self: stretch;
`;

const ErrorContainer = styled.div`
  display: flex;
  padding: 1.125rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.5rem;
  border: 2px solid rgba(183, 44, 37, 0.2);
  background: ${({ theme }) => theme.warning.bg};
  box-shadow: 0px 0px 12px 0px rgba(183, 28, 28, 0.1) inset,
    0px 0px 14px 0px rgba(183, 28, 28, 0.1);
`;

const ErrorContainerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  div {
    color: ${({ theme }) => theme.warning.top};
    text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: -0.154px;
  }
`;

const ErrorContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.176px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-self: stretch;
  flex: 1 0 0;
  overflow-y: hidden;
`;

const ChartContainer = styled.div`
  display: flex;
  padding: 1.125rem;
  flex-direction: column;
  gap: 1.125rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 12px;
  background: ${({ theme }) => theme.chart.bg};
`;

const ChartTopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const ChartNameDisplay = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.198px;
`;

const ChartContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  flex: 1 0 0;
`;

const IPListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1 0 0;
  overflow-y: auto;
`;

const TrafficInfoContainer = styled.div`
  display: flex;
  padding: 0.875rem 2rem;
  align-items: center;
  gap: 3rem;
  align-self: stretch;
  flex-basis: auto;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.traffic.hoverBg};
  }
`;

const TrafficAddress = styled.div`
  display: -webkit-box;
  min-width: 10rem;
  flex: 1 0 0;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  font-family: ${({ theme }) => theme.font.mono};
  letter-spacing: -0.36px;
`;

const TrafficInfo = ({ address, received, sent, onClick }) => {
  return (
    <TrafficInfoContainer onClick={onClick}>
      <TrafficAddress>{address}</TrafficAddress>
      <ByteInfo icon={<SendIcon />} value={sent} />
      <ByteInfo icon={<ReceiveIcon />} value={received} />
    </TrafficInfoContainer>
  );
};

const ByteInfoContainer = styled.div`
  display: flex;
  flex-basis: auto;
  align-items: center;
  gap: 0.375rem;
`;

const ByteInfoValue = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.36px;
`;

const ByteInfo = ({ icon, value }) => (
  <ByteInfoContainer>
    {icon}
    <ByteInfoValue>{value} Kbps</ByteInfoValue>
  </ByteInfoContainer>
);

const AddressDisplay = styled.div`
  opacity: 1;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 2rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.64px;
  text-align: left;
`;

const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex: 1 0 0;
  width: 800px;
  height: 800px;
  align-self: stretch;
`;

const ModalSummaryContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ModalChartContainer = styled.div`
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 26px;
`;

const TrafficInfoModal = ({ address, setAddress }) => {
  const trafficInfo = useRecoilValue(trafficState);

  if (!address) return <></>;
  const dataset = trafficInfo.map(({ traffic, timestamp }) => {
    if (!traffic[address]) return [0, 0, timestamp];
    const send =
      Math.floor(((traffic[address].SentBytes * 8) / 1000) * 100) / 100;
    const receive =
      Math.floor(((traffic[address].ReceivedBytes * 8) / 1000) * 100) / 100;

    return [send, receive, timestamp];
  });

  const lastTraffic = dataset[dataset.length - 1];

  return (
    <AnimatePresence mode=''>
      <LayerPopup title={address} onClose={() => setAddress(null)}>
        {trafficInfo ? (
          <ModalBodyContainer>
            <ModalSummaryContainer>
              <ByteInfo icon={<SendIcon />} value={lastTraffic[0]} />
              <ByteInfo icon={<ReceiveIcon />} value={lastTraffic[1]} />
            </ModalSummaryContainer>
            <ModalChartContainer>
              <Chart
                ChartComponent={Line}
                labels={dataset.map((traffic) => traffic[2])}
                datasets={[
                  {
                    data: dataset.map((traffic) => traffic[0]),
                    label: '송신'
                  },
                  {
                    data: dataset.map((traffic) => traffic[1]),
                    label: '수신'
                  }
                ]}
                width='100%'
                height='100%'
                flex='1 0 0'
                useLegend={false}
                scales={{
                  y: {
                    min: 0,
                    ticks: {
                      font: { size: 12 }
                    }
                  },
                  x: {
                    ticks: {
                      font: { size: 12 }
                    }
                  }
                }}
                tension={0.1}
              />
            </ModalChartContainer>
          </ModalBodyContainer>
        ) : (
          <AddressDisplay>월드 정보를 불러오지 못했습니다</AddressDisplay>
        )}
      </LayerPopup>
    </AnimatePresence>
  );
};

const Traffic = () => {
  const theme = useContext(ThemeContext);
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const trafficInfo = useRecoilValue(trafficState);
  const entries = [];
  const totalSendReceives = trafficInfo.map((data) => {
    let send = 0;
    let receive = 0;

    for (const key of Object.keys(data.traffic)) {
      const traffic = data.traffic[key];
      const SentBytes =
        Math.floor(((traffic.SentBytes * 8) / 1000) * 100) / 100;
      const ReceivedBytes =
        Math.floor(((traffic.ReceivedBytes * 8) / 1000) * 100) / 100;

      const index = entries.findIndex(([address]) => address === key);
      if (index !== -1) {
        entries[index] = [key, { SentBytes, ReceivedBytes }];
      } else {
        entries.push([key, { SentBytes, ReceivedBytes }]);
      }

      send += SentBytes ?? 0;
      receive += ReceivedBytes ?? 0;
    }

    return [send, receive, data.timestamp];
  });

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  const [address, setAddress] = useState(null); // null이 아니면 트래픽 정보 모달이 나온다.

  return (
    <TrafficContainer>
      <PageSummaryContainer>
        <DashboardSummary label='커넥션 수' value={entries.length} />
        <ErrorContainer>
          <ErrorContainerTop>
            <BanIcon
              color={theme.warning.top}
              transform='scale(0.666666666666667)'
            />
            <div>경고</div>
          </ErrorContainerTop>
          <ErrorContainerBottom>
            트래픽 기능은 알파 버전입니다. 여러 오류가 발생할 수 있습니다. 여러
            곳에서 트래픽 페이지에 접속하면 오차가 크게 발생합니다. 정확하게
            측정하려면 트래픽 페이지는 한곳에서만 열어 주세요.
          </ErrorContainerBottom>
        </ErrorContainer>
      </PageSummaryContainer>
      <ContentContainer>
        <ChartContainer>
          <ChartTopContainer>
            <SendAndReceiveIcon />
            <ChartNameDisplay>총 트래픽(Kbps)</ChartNameDisplay>
          </ChartTopContainer>
          <ChartContentContainer>
            <Chart
              ChartComponent={Line}
              labels={totalSendReceives.map(([_, __, timestamp]) => timestamp)}
              datasets={[
                {
                  data: totalSendReceives.map(([send]) => send),
                  label: '송신'
                },
                {
                  data: totalSendReceives.map(([_, receive]) => receive),
                  label: '수신'
                }
              ]}
              width='100%'
              height='100%'
              flex='1 0 0'
              useLegend={false}
              scales={{
                y: {
                  min: 0,
                  ticks: {
                    font: { size: 12 }
                  }
                },
                x: {
                  ticks: {
                    font: { size: 12 }
                  }
                }
              }}
              tension={0.1}
            />
          </ChartContentContainer>
        </ChartContainer>
        <IPListContainer>
          <Searchbar placeholder='IP로 검색' />
          {entries.map(
            (
              [address, { ReceivedBytes: received, SentBytes: sent }],
              index
            ) => (
              <TrafficInfo
                key={index}
                address={address}
                received={received}
                sent={sent}
                onClick={() => setAddress(address)}
              />
            )
          )}
        </IPListContainer>
      </ContentContainer>
      <TrafficInfoModal address={address} setAddress={setAddress} />
    </TrafficContainer>
  );
};

export default Traffic;
