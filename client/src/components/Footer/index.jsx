import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  position: relative, transform;
  padding: 50px 0px;
  background-color: #fafafa;
`;

const CopyrightDiv = styled.div`
  margin: 10px 20px;
`;

const PageDiv = styled.div`
  margin: 10px 40px;
`;

function Footer() {
  return (
    <StyledFooter>
      <CopyrightDiv>&copy; 2023 COMP322</CopyrightDiv>
      <PageDiv>Main</PageDiv>
      <PageDiv>Sign Up</PageDiv>
      <PageDiv>Log In</PageDiv>
      <PageDiv>My Page</PageDiv>
      <PageDiv>Search</PageDiv>
    </StyledFooter>
  );
}

export default Footer;
