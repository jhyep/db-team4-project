import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="Header">Header</div>
      <Outlet />
    </>
  );
}

export default App;
