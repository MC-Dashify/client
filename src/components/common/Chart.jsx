import { useRef } from 'react';
import styled from 'styled-components';

const backgroundColors = [
  '#DC6B65',
  '#F9C876',
  '#389287',
  '#026DB0',
  '#6C37DD',
  '#CF56DA',
  '#7D211C',
  '#935E06',
  '#2A6F66',
  '#014E7E',
  '#2F136D',
  '#761C7D'
];

const ChartWrapper = styled.div`
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $flex }) => $flex && `flex: ${$flex};`}
  overflow: auto;

  canvas {
    width: 100% !important;
  }
`;

const Chart = ({
  ChartComponent,
  labels,
  datasets,
  data,
  height,
  width,
  flex,
  useLegend = true,
  scales = {},
  tooltipCallbacks
}) => {
  const chartRef = useRef(null);

  const legendOptions = useLegend && {
    position: 'bottom',
    color: 'rgba(0, 0, 0, 0.6)',
    labels: {
      padding: 20,
      useBorderRadius: true,
      borderRadius: 4,
      boxHeight: 18,
      boxWidth: 18,
      font: {
        size: 18,
        weight: 700
      }
    }
  };

  return (
    <ChartWrapper $width={width} $height={height} $flex={flex}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <ChartComponent
          ref={chartRef}
          options={{
            maintainAspectRatio: false,

            elements: {
              arc: {
                weight: 10000,
                borderWidth: 0,
                hoverBorderWidth: 0,
                hoverOffset: 0
              }
            },
            plugins: {
              legend: legendOptions,
              tooltip: {
                caretSize: 8,
                titleFont: { size: 18 },
                padding: { x: 20, y: 16 },
                boxPadding: 6,
                callbacks: tooltipCallbacks
              }
            },
            layout: {
              padding: 20
            },
            scales
          }}
          data={{
            labels: labels,
            datasets: datasets?.map((dataset, index) => ({
              ...dataset,
              backgroundColor: backgroundColors[index % backgroundColors.length]
            })) ?? [
              {
                data: data,
                backgroundColor: backgroundColors
              }
            ]
          }}
        />
      </div>
    </ChartWrapper>
  );
};

export default Chart;
