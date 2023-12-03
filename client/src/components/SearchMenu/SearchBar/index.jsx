import styled from 'styled-components';
import palette from '../../../styles/palette';

function SearchBar({ width, onChange }) {
  return (
    <SearchArea width={width}>
      <SearchInput
        type="search"
        name="searchWord"
        placeholder="검색어를 입력해주세요"
        onChange={onChange}
      ></SearchInput>
      <SearchButton type="submit" />
    </SearchArea>
  );
}

export default SearchBar;

const SearchArea = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  margin-bottom: 5px;
`;

const SearchInput = styled.input`
  border: 4px solid ${palette.mainYellow};
  width: 100%;
  height: 100%;
  padding: 20px;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const SearchButton = styled.button`
  background-image: url('/src/assets/icons/searchIcon.svg');
  width: 30px;
  height: 30px;
  position: absolute;
  margin: 10px;
  right: 10px;
  cursor: pointer;
`;
