import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer>
      <FooterContents>
        <CopyrightDiv>&copy; 2023 COMP322</CopyrightDiv>
        <PageDiv>
          <Link to="/">Main</Link>
        </PageDiv>
        <PageDiv>
          <Link to="/signup">Sign Up</Link>
        </PageDiv>
        <PageDiv>
          <Link to="/login">Log In</Link>
        </PageDiv>
        <PageDiv>
          <Link to="/mypage">My Page</Link>
        </PageDiv>
        <PageDiv>Search</PageDiv>
        <PageDiv>
          <a href="https://github.com/jhyep/db-team4-project.git">Our Github</a>
        </PageDiv>
      </FooterContents>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  padding: 50px 0px;
  background-color: #f8f8f8;
  border-top: 1px solid rgba(172, 168, 155, 0.3);
  position: relative;
  transform: translateY(0%);
`;

const FooterContents = styled.div`
  color: #656d76;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  width: 1024px;
  font-size: 14px;
`;

const CopyrightDiv = styled.div`
  margin-top: 10px;
  margin-right: 40px;
`;

const PageDiv = styled.div`
  margin: 10px 40px;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;
