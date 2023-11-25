import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './routes/router.jsx';
import GlobalStyle from './styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
