import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ComputerChipIcon } from '../assets/24x-icons';
import Chart from '../components/common/Chart';
import { Line } from 'react-chartjs-2';
import { stringToBytes } from '../utils/convert';
import { addCommasToNumbers, floorDecimal } from '../utils/numbers';

const StatContainer = styled.div`
  display: grid;
  grid-template-areas:
    'cpu mem jvm'
    'disk tps tps';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  flex-direction: column;
  gap: 32px;
  flex: 1 0 0;
  filter: drop-shadow(0px 14px 32px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.1));

  min-width: fit-content;
`;

const StatChartBox = styled.div`
  display: flex;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 12px;
  background: #fbfbfb;
`;

const StatChartHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
`;

const StatChartHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  align-self: stretch;
  flex: 1;
`;

const StatChartIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const StatChartLabel = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000;
`;

const StatChartSummary = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
`;

const StatChartCard = ({
  label,
  id,
  icon,
  chartLabels,
  chartData,
  chartDatasets,
  summary,
  minY,
  maxY,
  useLegend = false,
  callback = (item) => item.raw.toLocaleString(),
  style = {}
}) => {
  return (
    <StatChartBox
      style={{
        gridArea: id,
        ...style
      }}
    >
      <StatChartHeader>
        <StatChartHeaderLeft>
          <StatChartIcon>{icon}</StatChartIcon>
          <StatChartLabel>{label}</StatChartLabel>
        </StatChartHeaderLeft>

        <StatChartSummary>{summary}</StatChartSummary>
      </StatChartHeader>

      <Chart
        ChartComponent={Line}
        labels={chartLabels}
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

const CPUSummaryContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const CPUCoresDisplay = styled.div`
  color: #000;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: -0.198px;
  opacity: 0.4;
`;

const CPULoadDisplay = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 100%;
  font-weight: 700;
  letter-spacing: -0.264px;
`;

const CPUChartSummary = ({ cpu: { cpuCores, cpuLoad } }) => (
  <CPUSummaryContainer>
    <CPUCoresDisplay>{cpuCores} 코어</CPUCoresDisplay>
    <CPULoadDisplay>{cpuLoad}</CPULoadDisplay>
  </CPUSummaryContainer>
);

const NumeratorDisplay = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 100%;
  font-weight: 700;
  letter-spacing: -0.264px;
`;

const FractionSignDisplay = styled.div`
  color: #000;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: -0.198px;
  opacity: 0.4;
`;

const DenominatorDisplay = styled.div`
  color: #000;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: -0.198px;
`;

const FractionSummary = ({ value, max }) => (
  <>
    <NumeratorDisplay>{value}</NumeratorDisplay>
    <FractionSignDisplay>/</FractionSignDisplay>
    <DenominatorDisplay>{max}</DenominatorDisplay>
  </>
);

const stringToMegabytes = (value) => stringToBytes(value) / 1024 ** 2;
const stringToMegabytesWithCommas = (value) =>
  stringToMegabytes(value).toLocaleString();

const tempStatsData = {
  jvm: {
    usedMemory: '815 MB',
    totalMemory: '2048 MB',
    maxMemory: '2048 MB',
    freeMemory: '1232 MB'
  },
  disk: {
    freeSpace: '30763 MB',
    totalSpace: '65517 MB'
  },
  mem: {
    usedMem: '24750 MB',
    totalMem: '32637 MB'
  },
  tps: [20.000113700646388, 17.999996940000468, 19.999989268894648],
  cpu: {
    cpuCores: 16,
    cpuLoad: 98.23
  }
};

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

  const [data, setData] = useState(tempStatsData);
  const { jvm, disk, mem, tps, cpu } = data;

  return (
    <StatContainer>
      {/* <StatCardsContainer> */}
      <StatChartCard
        id='cpu'
        label='CPU(%)'
        icon={<ComputerChipIcon />}
        chartLabels={[1]}
        chartData={[cpu.cpuLoad]}
        summary={<CPUChartSummary cpu={cpu} />}
        minY={0}
        maxY={100}
      />
      <StatChartCard
        id='mem'
        label='메모리(MB)'
        icon={<ComputerChipIcon />}
        chartLabels={[1]}
        chartData={[stringToMegabytes(mem.usedMem)]}
        summary={
          <FractionSummary
            value={stringToMegabytesWithCommas(mem.usedMem)}
            max={stringToMegabytesWithCommas(mem.totalMem)}
          />
        }
        minY={0}
        maxY={stringToMegabytes(mem.totalMem)}
      />
      <StatChartCard
        id='jvm'
        label='JVM 메모리(MB)'
        icon={<ComputerChipIcon />}
        chartLabels={[1]}
        chartData={[stringToMegabytes(jvm.usedMemory)]}
        summary={
          <FractionSummary
            value={stringToMegabytesWithCommas(jvm.usedMemory)}
            max={stringToMegabytesWithCommas(jvm.totalMemory)}
          />
        }
        minY={0}
        maxY={stringToMegabytes(jvm.totalMemory)}
      />
      {/* </StatCardsContainer>
    <StatCardsContainer> */}
      <StatChartCard
        id='disk'
        label='디스크(MB)'
        icon={<ComputerChipIcon />}
        chartLabels={[1]}
        chartData={[stringToMegabytes(disk.freeSpace)]}
        summary={
          <FractionSummary
            value={stringToMegabytesWithCommas(disk.freeSpace)}
            max={stringToMegabytesWithCommas(disk.totalSpace)}
          />
        }
        minY={0}
        maxY={stringToMegabytes(disk.totalSpace)}
        style={{
          flex: '1 0 0'
        }}
      />
      <StatChartCard
        id='tps'
        label='TPS'
        icon={<ComputerChipIcon />}
        chartLabels={[1]}
        chartDatasets={[
          { data: [tps[0]], label: '1분' },
          { data: [tps[1]], label: '5분' },
          { data: [tps[2]], label: '15분' }
        ]}
        summary={
          <FractionSummary value={floorDecimal(tps[0], 2)} max={'20.00'} />
        }
        minY={0}
        maxY={20}
        useLegend={true}
        callback={(item) => floorDecimal(item.raw, 2)}
        style={{
          flex: '2 0 0'
        }}
      />
      {/* </StatCardsContainer> */}
    </StatContainer>
  );
};

export default Stats;
