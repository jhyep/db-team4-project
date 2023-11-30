import styled from 'styled-components';
import palette from '../../styles/palette';

// 이 파일은 단순히 복사만 해 온 것이며, 아직 직접 작성된 내용이 없습니다.

export const MenuContainer = styled.div`
  color: #1b1d25;
  display: flex;
  gap: 20px;
  font-family: GmarketSansMedium;

  > div {
    cursor: pointer;
  }
`;

export const SearchArea = styled.div`
  display: flex;
  position: relative;
  width: 400px;
  height: 50px;
`;

export const SearchInput = styled.input`
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

export const SearchIcon = styled.img`
  position: absolute;
  margin: 10px;
  right: 10px;
  cursor: pointer;
`;
