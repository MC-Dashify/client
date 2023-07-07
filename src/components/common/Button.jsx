import styled, { css } from 'styled-components';

const ButtonBox = styled.button`
  display: flex;
  border-radius: 8px;
  border: none;
  justify-content: center;
  align-items: center;
  background: ${({ $color }) => $color ?? 'transparent'};
  color: ${({ $textColor }) => $textColor ?? '#000'};
  padding: ${({ $padding }) => $padding};
  min-height: 32px;
  font-weight: 700;
  line-height: 100%;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  user-select: none;

  ${({ $additionalStyle }) =>
    $additionalStyle ||
    css`
      &:hover,
      &:focus-visible {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `}
`;

const styles = {
  outline: css`
    border: 2px solid #000;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      0px 0px 8px 0px rgba(0, 0, 0, 0.15) inset;
    transition-property: box-shadow, background-color, transform;

    &:hover,
    &:focus-visible {
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    }

    &:active {
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
      transform: scale(0.98);
    }
  `

  // TODO filled
  // TODO accent
};

const Button = ({ styleType, color, textColor, padding = '16px 36px', children, ...props }) => {
  return (
    <ButtonBox
      $padding={padding}
      $additionalStyle={styles[styleType]}
      $color={color}
      $textColor={textColor}
      {...props}
    >
      {children}
    </ButtonBox>
  );
};

export default Button;
