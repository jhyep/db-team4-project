import styled from 'styled-components';
import SearchMenu from '../../components/SearchMenu';

function Main() {
  return (
    <Container>
      <SearchMenu width={'600px'} leftPadding={'60px'} />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  margin-top: 70px;
`;
