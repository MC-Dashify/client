import styled from 'styled-components';

const OverviewDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OverviewDataLabel = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.32px;
`;

const OverviewDataValueDisplay = styled.div`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.56px;
`;

const OverviewDataDisplay = ({ label, value }) => {
  return (
    <OverviewDataContainer>
      <OverviewDataLabel>{label}</OverviewDataLabel>
      <OverviewDataValueDisplay>{value}</OverviewDataValueDisplay>
    </OverviewDataContainer>
  );
};

export default OverviewDataDisplay;
