import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RightMenu from './HeaderMenu/RightMenu';
import palette from '../../styles/palette';

function Header() {
  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <Title>
            <Link to="/">북로그:BookLog</Link>
          </Title>
          <RightMenu />
        </HeaderContainer>
      </HeaderWrapper>
    </>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  background-color: #fff;
  border-bottom: 1px solid rgba(172, 168, 155, 0.3);
`;

const HeaderContainer = styled.div`
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
