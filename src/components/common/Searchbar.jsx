import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';
import { useContext } from 'react';

const SearchbarContainer = styled.div`
  display: flex;
  padding: ${({ $hasOptions }) => $hasOptions ? '8px 20px 8px 0' : '0 20px'};
  align-items: center;
  gap: 14px;
  align-self: stretch;
  border-radius: 12px;
  background: ${({ theme }) => theme.input.bg};

  height: 44px;
  box-sizing: border-box;

  width: 100%;
`;

const Separator = styled.div`
  width: 1px;
  align-self: stretch;
  opacity: 0.1;
  background: #000;
`;

const Searchbox = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.text};
  text-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.176px;

  background-color: transparent;
  outline: none;
  border: none;

  &::placeholder {
    opacity: 0.6;
  }
`;

const Searchbar = ({
  selectedValue,
  setSelectedValue,
  searchValue,
  setSearchValue,
  placeholder = '검색',
  options = []
}) => {
  const theme = useContext(ThemeContext);

  return (
    <SearchbarContainer $hasOptions={options.length > 0}>
      {options.length > 0 && <>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '12px',
              height: '44px',
              width: '98px',
              boxSizing: 'content-box',
              paddingLeft: '10px',
              color: theme.text,
              textShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '100%',
              letterSpacing: '-0.176px'
            }),
            option: (styles, { data, isFocused }) => ({
              ...styles,
              color: theme.text,
              backgroundColor: isFocused ? theme.input.focusBg : theme.input.bg,
              '&:hover, &:active': {
                backgroundColor: theme.input.hoverBg
              }
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.input.bg
            })
          }}
          options={options}
          components={{
            IndicatorSeparator: () => null
          }}
          isSearchable={false}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
        />
        <Separator />
      </>}
      <Searchbox
        placeholder={placeholder}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        value={searchValue}
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
