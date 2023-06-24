import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $flex }) => $flex && `flex: ${$flex};`}
`;

const Chart = ({ ChartComponenet, labels, data, height, width, flex }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const eventCallback = () => {
      if (chartRef.current) {
        chartRef.current.resize(1, 1);
        // 0, 0으로 하면 resize받을 때마다 애니메이션 발동됩니다
        // 인자를 비우면 작동하지 않습니다
      }
    };

    window.addEventListener('resize', eventCallback);

    return () => {
      window.removeEventListener('resize', eventCallback);
    };
  }, [chartRef]);

  return (
    <ChartWrapper $width={width} $height={height} $flex={flex}>
      <ChartComponenet
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
            legend: {
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
            },
            tooltip: {
              caretSize: 8,
              titleFont: { size: 18 },
              padding: { x: 20, y: 16 },
              boxPadding: 6
            }
          },
          layout: {
            padding: 20
          }
        }}
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
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
              ]
            }
          ]
        }}
      />
    </ChartWrapper>
  );
};

export default Chart;
