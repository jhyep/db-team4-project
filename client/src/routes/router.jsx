import App from '../App';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import { Outlet, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Outlet />,
        children: [
          { index: true, element: <div>main</div> },
          { path: 'signup', element: <SignUp /> },
          { path: 'login', element: <LogIn /> },
          { path: 'mypage', element: <div>마이페이지</div> },
          { path: 'search', element: <div>검색 결과 페이지</div> },
          {
            path: 'book',
            element: <Outlet />,
            children: [
              {
                path: ':book_id',
                element: <div>book info</div>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Error Page</div>,
  },
]);

export default router;
