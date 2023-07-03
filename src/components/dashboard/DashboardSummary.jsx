import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SummaryValue = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const DashboardSummary = ({ label, value }) => {
  return (
    <SummaryContainer>
      <div>{label}</div>
      <SummaryValue>{value}</SummaryValue>
    </SummaryContainer>
  );
};

export default DashboardSummary;
