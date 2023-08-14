import styled, { css } from "styled-components";

const ButtonBox = styled.button`
  /* 모든 VARIANT 공통 style */
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
  transition: background-color 0.2s ease;

  ${({ $variant }) => $variant}
  ${({ $size }) => $size}
`;

const SIZES = {
  big: css`
    padding: 16px 36px;
    font-size: 18px;
  `,

  medium: css`
    padding: 10px 20px;
    font-size: 18px;
  `,

  small: css`
    padding: 10px 18px;
    font-size: 16px;
  `,
};

const getGeneralVariantStyle = (variantName, additionalStyle) => css`
  background-color: ${({ theme }) => theme.button[variantName].bg};
  color: ${({ theme }) => theme.button[variantName].text};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.button[variantName].hoverBg};
  }

  &:active {
    background: ${({ theme }) => theme.button[variantName].activeBg};
  }

  ${additionalStyle}
`;

const VARIANT = {
  unset: getGeneralVariantStyle("unset"),
  primary: getGeneralVariantStyle(
    "primary",
    css`
      box-shadow: 0px 0px 14px 0px ${({ theme }) => theme.button.primary.bg}44;
    `
  ),
  secondary: getGeneralVariantStyle("secondary"),
  tertiary: getGeneralVariantStyle("tertiary"),
  danger: getGeneralVariantStyle("danger"),

  disabled: css`
    background-color: ${({ theme }) => theme.button.disabled.bg};
    color: ${({ theme }) => theme.button.disabled.text};

    pointer-events: none;
  `,
};

/**
 * @param {Object} props
 * @param {"primary" | "secondary" | "tertiary"  | "danger" | "unset"} props.variant
 * @param {"big" | "medium" | "small"} props.size
 */
const Button = ({ variant, size, children, disabled, ...props }) => {
  const variantStyle = disabled
    ? VARIANT.disabled
    : VARIANT[variant] || VARIANT.unset;
  const sizeStyle = SIZES[size] || SIZES.big;

  return (
    <ButtonBox
      disabled={disabled}
      $variant={variantStyle}
      $size={sizeStyle}
      {...props}
    >
      {children}
    </ButtonBox>
  );
};

export default Button;
