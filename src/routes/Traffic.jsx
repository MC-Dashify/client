import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import { BanIcon, ReceiveIcon, SendAndReceiveIcon, SendIcon } from '../assets/24x-icons';
import Chart from '../components/common/Chart';
import { Line } from 'react-chartjs-2';
import Searchbar from '../components/common/Searchbar';
import { showModal } from '../utils/modal';

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
  background: #ffe5e5;
  box-shadow: 0px 0px 12px 0px rgba(183, 44, 37, 0.1) inset,
    0px 0px 14px 0px rgba(183, 44, 37, 0.1);
`;

const ErrorContainerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  div {
    color: #b72c25;
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
`;

const ChartContainer = styled.div`
  display: flex;
  padding: 1.125rem;
  flex-direction: column;
  gap: 1.125rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 12px;
  background: #FBFBFB;
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
`;

const TrafficInfoContainer = styled.div`
  display: flex;
  padding: 0.875rem 2rem;
  align-items: center;
  gap: 3rem;
  align-self: stretch;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const TrafficAddress = styled.div`
  display: -webkit-box;
  min-width: 12.5rem;
  flex: 1 0 0;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  font-family: 'JetBrains Mono';
  letter-spacing: -0.36px;
`;

const TrafficInfo = ({ address, received, sent }) => (
  <TrafficInfoContainer
    onClick={() => {
      showModal(<TrafficInfoModal address={address} />, '62.5rem');
    }}
  >
    <TrafficAddress>{address}</TrafficAddress>
    <ByteInfo icon={<SendIcon />} value={sent} />
    <ByteInfo icon={<ReceiveIcon />} value={received} />
  </TrafficInfoContainer>
);

const ByteInfoContainer = styled.div`
  display: flex;
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

  color: #000;
`;

const ByteInfo = ({ icon, value }) => (
  <ByteInfoContainer>
    {icon}
    <ByteInfoValue>{value} 바이트</ByteInfoValue>
  </ByteInfoContainer>
);

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  overflow: hidden;
`;

const AddressDisplay = styled.div`
  color: #000;
  opacity: 1;
  font-family: 'JetBrains Mono';
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

const TrafficInfoModal = ({ address }) => {
  const [traffic, setTraffic] = useState(undefined);
  const [sendDataset, setSendDataset] = useState([]);
  const [receiveDataset, setReceiveDataset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrafficInfo(address);
      setTraffic(data);

      setSendDataset([data.SentBytes]);
      setReceiveDataset([data.ReceivedBytes]);
    };
    fetchData();
  }, [address]);

  return (
    <ModalContainer>
      <AddressDisplay>{address}</AddressDisplay>
      {traffic ? (
        <ModalBodyContainer>
          <ModalSummaryContainer>
            <ByteInfo icon={<SendIcon />} value={traffic.SentBytes} />
            <ByteInfo icon={<ReceiveIcon />} value={traffic.ReceivedBytes} />
          </ModalSummaryContainer>
          <ModalChartContainer>
            <Chart
              ChartComponent={Line}
              labels={sendDataset.map((_, index) => index)}
              datasets={[
                { data: sendDataset, label: '송신' },
                { data: receiveDataset, label: '수신' },
              ]}
              width='100%'
              height='100%'
              flex='1 0 0'
              useLegend={false}
              scales={{
                y: {
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
    </ModalContainer>
  );
};

const getTrafficInfo = async (address) => tempTrafficData.traffic[address];

const tempTrafficData = {
  status: 'ok',
  traffic: {
    '127.0.0.1:1223': {
      ReceivedBytes: 28,
      SentBytes: 147
    },
    '127.0.0.1:1224': {
      ReceivedBytes: 28,
      SentBytes: 147
    }
  }
};

const Traffic = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  return (
    <TrafficContainer>
      <PageSummaryContainer>
        <DashboardSummary label='커넥션 수' value={0} />
        <ErrorContainer>
          <ErrorContainerTop>
            <BanIcon color='#B72C25' transform='scale(0.666666666666667)' />
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
            <ChartNameDisplay>총 트래픽(바이트)</ChartNameDisplay>
          </ChartTopContainer>
          <ChartContentContainer>
            <Chart
              ChartComponent={Line}
              labels={[
                '1',
                '2',
                '3'
              ]}
              datasets={[
                { data: [3600, 4800, 4200], label: '송신' },
                { data: [4700, 5000, 6000], label: '수신' },
              ]}
              width='100%'
              height='100%'
              flex='1 0 0'
              useLegend={false}
              scales={{
                y: {
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
          <Searchbar
            placeholder='IP로 검색'
          />
          {Object.entries(tempTrafficData.traffic).map(([address, { ReceivedBytes: received, SentBytes: sent }], index) => (
            <TrafficInfo key={index} address={address} received={received} sent={sent} />
          ))}
        </IPListContainer>
      </ContentContainer>
    </TrafficContainer>
  );
};

export default Traffic;
