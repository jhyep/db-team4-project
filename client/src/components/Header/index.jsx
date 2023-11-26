import styled from 'styled-components';
import LeftMenu from './HeaderMenu/LeftMenu';
import SearchBar from './SearchBar';
import RightMenu from './HeaderMenu/RightMenu';
import palette from '../../styles/palette';

function Header() {
  return (
    <>
      <HeaderContainer>
        <Title>독후감 사이트</Title>
        <LeftMenu />
        <SearchBar />
        <RightMenu />
      </HeaderContainer>
      <Divider />
    </>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  padding: 50px 0 30px 0;
  align-items: center;
  justify-content: space-between;
  width: 1024px;
  margin: auto;
`;

const Title = styled.h2`
  color: ${palette.mainYellow};
  cursor: pointer;
  font-family: GmarketSansBold;
`;

const Divider = styled.div`
  border-bottom: 1px solid rgba(172, 168, 155, 0.3);
`;
