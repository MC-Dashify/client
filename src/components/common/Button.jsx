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
    background: ${({ theme }) => theme.button.outline.bg};
    border: 2px solid ${({ theme }) => theme.button.outline.border};
    box-shadow: ${({ theme }) => theme.button.outline.shadow.normal};
    transition-property: box-shadow, background-color, transform;

    &:hover,
    &:focus-visible {
      box-shadow: ${({ theme }) => theme.button.outline.shadow.hover};
    }

    &:active {
      background: ${({ theme }) => theme.button.outline.activeBg};
      box-shadow: ${({ theme }) => theme.button.outline.shadow.normal};
      transform: scale(0.98);
    }
  `,

  filled: css`
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
    background: ${({ theme }) => theme.button.danger.bg};
    color: ${({ theme }) => theme.button.danger.text};

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.button.danger.hoverBg};
    }

    &:active {
      background-color: ${({ theme }) => theme.button.danger.activeBg};
    }
  `,

  hidden: css`
    width: 0px;
    height: 0px;

    min-width: 0px;
    min-height: 0px;

    padding: 0;
    margin: 0;
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
