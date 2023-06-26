import { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;

  align-items: center;

  cursor: pointer;

  height: ${({ $height }) => $height};
`;

const DropdownLabel = styled.div`
  color: #000;
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.176px;
`;

const DropdownOptions = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #f2f3f5;
  width: 150px;

  position: absolute;
  transform: translateY(${({ $height }) => $height});
`;

const DropdownOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40px;
`;

const DropdownOption = ({ label, setValue }) => {
  return <DropdownOptionBox>{label}</DropdownOptionBox>;
};

const Dropdown = ({
  options,
  height = '28px',
  onSelect = () => {},
  onExpand = () => {},
  onCollapse = () => {},
  ...props
}) => {
  const [value, setValue] = useState(options[0]);
  const [expanded, setExpanded] = useState(false);

  return (
    <DropdownContainer {...props}>
      <DropdownButton
        $height={height}
        onClick={() => {
          setExpanded(true);
          onExpand();
        }}
      >
        <DropdownLabel>{value}</DropdownLabel>
      </DropdownButton>
      {expanded && (
        <DropdownOptions $height={height}>
          {options.map((option, index) => (
            <DropdownOption key={index} label={option} />
          ))}
        </DropdownOptions>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
