import { useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { stringToBytes } from '../utils/convert';
import Chart from '../components/common/Chart';
import { useRecoilValue } from 'recoil';
import { statsState, worldsState } from '../contexts/states';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1 0 0;
  filter: drop-shadow(0px 14px 32px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.1));
  min-width: fit-content;
`;

const StatCardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex: 1 0 0;
`;

const StatCardBox = styled.div`
  @property --근원컬러 { // 참신하게 한글코딩을 하라고 지시하셔서...
    syntax: '<color>';
    initial-value: white;
    inherits: false;
  }

  ${({ $colorType, theme }) => css`--근원컬러: ${theme.overview[$colorType]};`}

  transition: --근원컬러 1s ease-in-out;
  background: var(--근원컬러);
  background: linear-gradient(316deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%),  var(--근원컬러);
  background-blend-mode: overlay, normal;
  background-origin: border-box;

  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
  color: #fff;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  line-height: 100%;
  border-radius: 22px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  background-origin: border-box;
`;

const StatCardLabel = styled.div`
  font-size: clamp(14px, 2vw, 36px);
  width: 100%;
`;

const StatCardValue = styled.div`
  font-size: clamp(20px, 3.5vw, 72px);
  width: 100%;
  word-wrap: break-word;
`;

const StatCardValueUnit = styled.span`
  font-size: clamp(18px, 2vw, 36px);
  opacity: 0.6;
  font-weight: 400;
`;

/**
 *
 * @param {Object} props
 * @param {('red'|'yellow'|'green'|'blue'|'gray')} props.colorType
 */
const StatCard = ({ label, value, valueUnit, colorType = 'gray' }) => {
  return (
    <StatCardBox $colorType={colorType}>
      <StatCardLabel>{label}</StatCardLabel>

      <StatCardValue>
        {value}
        <StatCardValueUnit>{valueUnit}</StatCardValueUnit>
      </StatCardValue>
    </StatCardBox>
  );
};

const ChartCard = styled.div`
  display: flex;
  height: 70%;
  padding: 48px 56px;
  gap: 32px;
  border-radius: 22px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  background-origin: border-box;

  background: ${({ theme }) => theme.chart.bg};
`;

const ChartSectionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  filter: drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.15));
  align-items: center;
`;

const ChartTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ChartLabel = styled.div`
  font-size: 32px;
  line-height: 100%;
  opacity: 0.6;
`;

const ChartValue = styled.div`
  font-size: 56px;
  font-weight: 700;
  line-height: 120%;
  overflow-wrap: anywhere;
`;

const ChartValueUnit = styled.span`
  font-size: 30px;
  font-weight: 400;
  opacity: 0.6;
`;

const EmptyChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1 0 0;

  font-size: 128px;
`;

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.valueUnit
 * @param {string[]} props.chartLabels
 * @param {number[]} props.chartData
 */
const ChartSection = ({ label, valueUnit, chartLabels, chartData }) => {
  const sum = useMemo(() => chartData.reduce((a, b) => a + b, 0), [chartData]);

  return (
    <ChartSectionBox>
      <ChartTextContainer>
        <ChartLabel>{label}</ChartLabel>

        <ChartValue>
          {Math.round(sum * 10) / 10 + ' '}
          <ChartValueUnit>{valueUnit}</ChartValueUnit>
        </ChartValue>
      </ChartTextContainer>

      {sum > 0 ? (
        <Chart
          ChartComponent={Doughnut}
          labels={chartLabels}
          data={chartData}
          width='100%'
          flex='1 0 0'
        />
      ) : (
        <EmptyChartContainer>N/A</EmptyChartContainer>
      )}
    </ChartSectionBox>
  );
};

const VerticalDivider = styled.div`
  height: 100%;
  width: 1px;
  background-color: black;
  opacity: 0.2;
`;

/**
 * @param {string | number} used
 * @param {string} total
 */
const getUsedPercantage = (used, total) => {
  return (
    ((typeof used === 'number' ? used : stringToBytes(used)) /
      stringToBytes(total)) *
    100
  ).toFixed(1);
};

const colorType = (value, min = 0, max = 100, reverse = false) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const colors = ['blue', 'green', 'yellow', 'red'];

  if (percentage >= 86) return colors[reverse ? 0 : 3];
  if (percentage >= 71) return colors[reverse ? 1 : 2];
  if (percentage >= 31) return colors[reverse ? 2 : 1];
  return colors[reverse ? 3 : 0];
};

const Overview = () => {
  // eslint-disable-next-line no-unused-vars
  const [refreshFn, setRefreshFn] = useOutletContext();
  const worldDetails = useRecoilValue(worldsState);
  const worlds = useMemo(() => Object.values(worldDetails), [worldDetails]);
  const statsData = useRecoilValue(statsState);

  // if (!statsData?.length) return <></>;
  const { jvm, disk, mem, tps, cpu } = statsData[statsData.length - 1];

  const cpuValue = cpu.cpuLoad.toFixed(1);
  const ramValue = getUsedPercantage(mem.usedMem, mem.totalMem);
  const jvmValue = getUsedPercantage(jvm.usedMemory, jvm.totalMemory);
  const diskValue = getUsedPercantage(disk.usedSpace, disk.totalSpace);
  const tpsValue = (tps.reduce((a, b) => a + b, 0) / tps.length).toFixed(1);

  const worldNames = worlds.map(({ name }) => name);

  const countOfEntities = worlds.map((world) => world.entities);
  const countOfPlayers = worlds.map((world) => world.player);
  const countOfSize = worlds.map(
    (world) => stringToBytes(world.size) / 1024 ** 3
  );

  useEffect(() => {
    // 이 컴포넌트에서 DashboardLayout으로 정보 새로 고침 함수를 넘겨야 합니다
    // TODO 정보 새로 고침
    setRefreshFn(() => {
      console.log('refreshed');
    });
  }, [setRefreshFn]);

  return (
    <CardContainer>
      <StatCardContainer>
        <StatCard
          colorType={colorType(cpuValue)}
          label='CPU'
          value={cpuValue}
          valueUnit='%'
        />
        <StatCard
          colorType={colorType(ramValue)}
          label='RAM'
          value={ramValue}
          valueUnit='%'
        />
        <StatCard
          colorType={colorType(jvmValue)}
          label='JVM RAM'
          value={jvmValue}
          valueUnit='%'
        />
        <StatCard
          colorType={colorType(diskValue)}
          label='DISK'
          value={diskValue}
          valueUnit='%'
        />
        <StatCard
          colorType={colorType(tpsValue, 0, 20, true)}
          label='TPS (Mean)'
          value={tpsValue}
        />
      </StatCardContainer>

      <ChartCard>
        <ChartSection
          label='엔티티'
          chartData={countOfEntities}
          chartLabels={worldNames}
          valueUnit='개'
        />
        <VerticalDivider />
        <ChartSection
          label='플레이어'
          chartData={countOfPlayers}
          chartLabels={worldNames}
          valueUnit='명'
        />
        <VerticalDivider />
        <ChartSection
          label='용량'
          chartData={countOfSize}
          chartLabels={worldNames}
          valueUnit='GB'
        />
      </ChartCard>
    </CardContainer>
  );
};

export default Overview;
