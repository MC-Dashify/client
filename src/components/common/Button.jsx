import styled, { css } from 'styled-components';

const ButtonBox = styled.button`
  display: flex;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.button.unset.bg};
  color: ${({ theme }) => theme.button.unset.text};
  gap: 8px;
  justify-content: center;
  align-items: center;
  background: transparent;
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
        background-color: ${({ theme }) => theme.button.unset.hoverBg};
      }

      &:active {
        background-color: ${({ theme }) => theme.button.unset.activeBg};
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
  `,

  filled: css`
    /* background: #e1edff;
    color: #2255a1; */

    background: ${({ theme }) => theme.button.secondary.bg};
    color: ${({ theme }) => theme.button.secondary.text};

    &:hover,
    &:focus-visible {
      background: ${({ theme }) => theme.button.secondary.hoverBg};
    }

    &:active {
      background: ${({ theme }) => theme.button.secondary.activeBg};
    }
  `,

  accent: css`
    background: ${({ theme }) => theme.button.primary.bg};
    color: ${({ theme }) => theme.button.primary.text};
    box-shadow: 0px 0px 14px 0px rgba(98, 153, 237, 0.25);

    &:hover,
    &:focus-visible {
      background: ${({ theme }) => theme.button.primary.hoverBg};
    }

    &:active {
      background: ${({ theme }) => theme.button.primary.activeBg};
    }
  `,

  warning: css`
    background: #ffe1e8;
    color: #d8413a;

    &:hover,
    &:focus-visible {
      background-color: rgb(255, 225, 232, 0.7);
    }

    &:active {
      background-color: rgb(255, 225, 232, 0.6);
    }
  `
};

const Button = ({
  styleType,
  padding = '16px 36px',
  children,
  icon,
  ...props
}) => {
  return (
    <ButtonBox
      $additionalStyle={styles[styleType]}
      $padding={padding}
      {...props}
    >
      {icon}
      {children}
    </ButtonBox>
  );
};

export default Button;
