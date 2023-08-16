import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  opacity: 0.6;
  user-select: none;
`;

const InputBoxDiv = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.input.bg};
  outline: 0 solid transparent;
  transition: all 0.2s ease-in-out;
  transition-property: outline, background-color, box-shadow;
  align-self: stretch;

  &:has(:focus-visible) {
    outline: 1px solid ${({ theme }) => theme.input.focusOutline};
    background-color: transparent;
    box-shadow: 0 0 16px 0 ${({ theme }) => theme.input.focusOutline}33,
      0 0 8px 0 ${({ theme }) => theme.input.focusOutline}33 inset;
  }

  input {
    border: none;
    background-color: transparent;
    padding: 18px 20px;
    font-size: 16px;
    flex: 1;
    width: 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      user-select: none;
    }
  }
`;

/** \<InputBox> 컴포넌트는 children을 감싸 인풋 필드처럼 보이게 하는 역할을 합니다.
 * 실제로 "서버 주소와 포트"처럼, 인풋 하나처럼 보이지만 children은 여러 개인
 * 부분이 있습니다.
 * children으로 \<input>을 사용하면 알아서 스타일링됩니다.
 *
 * ```js
 * <InputBox label="보안 키">
 *   <input placeholder="서버에서 발급받은 보안 키 입력" />
 * </InputBox>
 * ```
 */
const InputBox = ({ children, label }) => {
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <InputBoxDiv>{children}</InputBoxDiv>
    </InputContainer>
  );
};

export default InputBox;
