import styled from "styled-components";

const IconButton = styled.button`
  display: flex;
  aspect-ratio: 1 / 1;
  align-items: center;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  padding: 8px;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.active};
  }
`;

export default IconButton;
