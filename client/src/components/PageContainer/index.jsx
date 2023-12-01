import styled from 'styled-components';

function PageContainer({ children }) {
  return <Container>{children}</Container>;
}

export default PageContainer;

const Container = styled.div`
  width: 1024px;
  margin: auto;
  padding-top: 50px;
`;
