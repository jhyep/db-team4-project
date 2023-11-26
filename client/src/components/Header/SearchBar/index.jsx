import styled from 'styled-components';
import palette from '../../../styles/palette';
import searchIcon from '../../../assets/icons/searchIcon.svg';

function SearchBar() {
  return (
    <form>
      <SearchArea>
        <SearchInput
          type="search"
          placeholder="검색어를 입력해주세요"
        ></SearchInput>
        <SearchIcon src={searchIcon} alt="검색" />
      </SearchArea>
    </form>
  );
}

export default SearchBar;

const SearchArea = styled.div`
  display: flex;
  position: relative;
  width: 400px;
  height: 50px;
`;

const SearchInput = styled.input`
  border: 2px solid ${palette.mainYellow};
  border-radius: 30px;
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

const SearchIcon = styled.img`
  position: absolute;
  margin: 10px;
  right: 10px;
  cursor: pointer;
`;
