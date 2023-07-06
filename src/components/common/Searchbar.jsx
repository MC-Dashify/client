import styled from 'styled-components';
import Select from 'react-select';

const SearchbarContainer = styled.div`
  display: flex;
  padding: ${({ $hasOptions }) => $hasOptions ? '8px 20px 8px 0' : '0 20px'};
  align-items: center;
  gap: 14px;
  align-self: stretch;
  border-radius: 12px;
  background: #f7f7f7;

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

  color: #000;
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

              color: '#000',
              textShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '100%',
              letterSpacing: '-0.176px'
            }),
            option: (styles, { data, isFocused }) => ({
              ...styles,
              color: 'black',
              backgroundColor: isFocused ? '#e7e7e7' : '#f7f7f7',
              '&:hover, &:active': {
                backgroundColor: '#e7e7e7'
              }
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: '#f7f7f7'
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
