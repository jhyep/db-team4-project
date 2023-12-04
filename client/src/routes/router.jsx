import App from '../App';
import Main from '../pages/Main';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import SignUp from '../pages/SignUp';
import Search from '../pages/Search';
import AdminPage from '../pages/AdminPage';
import UserInfoEditPage from '../pages/MyPage/UserInfoEditPage';
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
          { index: true, element: <Main /> },
          { path: 'signup', element: <SignUp /> },
          { path: 'login', element: <LogIn /> },
          { path: 'search', element: <Search /> },
          { path: 'mypage', element: <MyPage /> },
          {
            path: 'user-info-edit',
            element: <UserInfoEditPage />,
          },
          {
            path: 'admin',
            element: <AdminPage />,
          },
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
