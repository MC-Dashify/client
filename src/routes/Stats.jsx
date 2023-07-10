import styled from 'styled-components';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ComputerChipIcon,
  HardDiskIcon,
  MemoryChipIcon,
  TimerIcon
} from '../assets/24x-icons';
import Chart from '../components/common/Chart';
import { Line } from 'react-chartjs-2';
import { stringToBytes } from '../utils/convert';
import { floorDecimal } from '../utils/numbers';
import { useRecoilValue } from 'recoil';
import { statsState } from '../contexts/states';

const StatContainer = styled.div`
  display: grid;
  grid-template-areas:
    'cpu mem jvm'
    'disk tps tps';
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  flex: 1 0 0;
  filter: drop-shadow(0px 14px 32px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.1));

  min-width: fit-content;
`;

const StatChartBox = styled.div`
  display: flex;
  padding: 18px;
  flex-direction: column;
  gap: 18px;
  border-radius: 12px;
  background: #fbfbfb;

  grid-area: ${(props) => props.$gridArea};
`;

const StatChartHeader = styled.div`
  display: flex;
  align-items: center;

  svg {
    flex-shrink: 0;
  }
`;

const StatChartHeaderTitle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const StatChartLabel = styled.div`
  font-weight: 700;
  font-size: 24px;
`;

const StatChartCurrentValue = styled.div`
  display: flex;
  gap: 8px;
`;

const StatChartCard = ({
  label,
  id,
  icon,
  chartLabels,
  chartData,
  chartDatasets,
  currentValue,
  minY = 0,
  maxY,
  useLegend = false,
  callback = (item) => item.raw.toLocaleString()
}) => {
  return (
    <StatChartBox $gridArea={id}>
      <StatChartHeader>
        <StatChartHeaderTitle>
          {icon}
          <StatChartLabel>{label}</StatChartLabel>
        </StatChartHeaderTitle>

        <StatChartCurrentValue>{currentValue}</StatChartCurrentValue>
      </StatChartHeader>

      <Chart
        ChartComponent={Line}
        labels={chartLabels || ['']}
        datasets={chartDatasets}
        data={chartData}
        width='100%'
        flex='1 0 0'
        useLegend={useLegend}
        tooltipCallbacks={{
          label: callback
        }}
        scales={{
          y: {
            suggestedMin: minY,
            suggestedMax: maxY,
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
      />
    </StatChartBox>
  );
};

const CurrentValueContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 100%;
  font-size: 18px;
  gap: 8px;
`;

const CurrentValueAdditional = styled.div`
  opacity: 0.4;
  margin-right: 8px;
`;

const CurrentValueValue = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const CurrentValue = ({ additional, value, max }) => {
  return (
    <CurrentValueContainer>
      {additional && (
        <CurrentValueAdditional>{additional}</CurrentValueAdditional>
      )}

      <CurrentValueValue>{value}</CurrentValueValue>

      {max && (
        <>
          <div style={{ opacity: 0.4 }}>/</div>
          {max}
        </>
      )}
    </CurrentValueContainer>
  );
};

const stringToMegabytes = (value) => stringToBytes(value) / 1024 ** 2;
const stringToMegabytesWithCommas = (value) =>
  stringToMegabytes(value).toLocaleString();

const Stats = () => {
  /*
    TODO:
    - 그래프 그릴 수 있도록 정보 모아서 데이터로 반환
    - 아이콘 바꾸기
  */

  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => console.log('refreshed'));
  }, [setRefreshFn]);

  const statsData = useRecoilValue(statsState);
  const { jvm, disk, mem, tps, cpu } = statsData[statsData.length - 1];
  const labels = statsData.map((_, index) => index);

  return (
    <StatContainer>
      <StatChartCard
        id='cpu'
        label='CPU(%)'
        icon={<ComputerChipIcon />}
        chartLabels={labels}
        chartData={statsData.map(({ cpu }) => cpu.cpuLoad)}
        currentValue={
          <CurrentValue
            additional={`${cpu.cpuCores} 코어`}
            value={floorDecimal(cpu.cpuLoad, 2)}
          />
        }
        maxY={100}
      />

      <StatChartCard
        id='mem'
        label='메모리(MB)'
        icon={<MemoryChipIcon />}
        chartLabels={labels}
        chartData={statsData.map(({ mem }) => stringToMegabytes(mem.usedMem))}
        currentValue={
          <CurrentValue
            value={stringToMegabytesWithCommas(mem.usedMem)}
            max={stringToMegabytesWithCommas(mem.totalMem)}
          />
        }
        maxY={stringToMegabytes(mem.totalMem)}
      />

      <StatChartCard
        id='jvm'
        label='JVM 메모리(MB)'
        icon={<MemoryChipIcon />}
        chartLabels={labels}
        chartData={statsData.map(({ jvm }) =>
          stringToMegabytes(jvm.usedMemory)
        )}
        currentValue={
          <CurrentValue
            value={stringToMegabytesWithCommas(jvm.usedMemory)}
            max={stringToMegabytesWithCommas(jvm.totalMemory)}
          />
        }
        maxY={stringToMegabytes(jvm.totalMemory)}
      />

      <StatChartCard
        id='disk'
        label='디스크(MB)'
        icon={<HardDiskIcon />}
        chartLabels={labels}
        chartData={statsData.map(({ disk }) =>
          stringToMegabytes(disk.freeSpace)
        )}
        currentValue={
          <CurrentValue
            value={stringToMegabytesWithCommas(disk.freeSpace)}
            max={stringToMegabytesWithCommas(disk.totalSpace)}
          />
        }
        maxY={stringToMegabytes(disk.totalSpace)}
      />

      <StatChartCard
        id='tps'
        label='TPS'
        icon={<TimerIcon />}
        chartLabels={labels}
        chartDatasets={[
          { data: statsData.map(({ tps }) => tps[0]), label: '1분' },
          { data: statsData.map(({ tps }) => tps[1]), label: '5분' },
          { data: statsData.map(({ tps }) => tps[2]), label: '15분' }
        ]}
        currentValue={
          <CurrentValue
            additional='(평균값)'
            value={floorDecimal(tps[0], 2)}
            max={'20.00'}
          />
        }
        maxY={20}
        useLegend={true}
        callback={(item) => floorDecimal(item.raw, 2)}
      />
    </StatContainer>
  );
};

export default Stats;
