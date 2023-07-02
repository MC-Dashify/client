import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import OverviewDataDisplay from '../components/common/OverviewDataDisplay';
import { BanIcon } from '../assets/24x-icons';

const TrafficContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;
`;

const OverviewContainer = styled.div`
  display: flex;
  align-items: center;
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
    letter-spacing: -0.00963rem;
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
  letter-spacing: -0.011rem;
`;

const tempTrafficData = {
  status: 'ok',
  traffic: {
    '127.0.0.1:1223': {
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
      <OverviewContainer>
        <OverviewDataDisplay label='커넥션 수' value={0} />
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
      </OverviewContainer>
    </TrafficContainer>
  );
};

export default Traffic;
