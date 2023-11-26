import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Wrap>
        <Header />
        <Outlet />
      </Wrap>
      <Footer />
    </>
  );
}

export default App;

const Wrap = styled.div`
  min-height: 600px;
  position: relative;
  padding-bottom: 50px;
`;
