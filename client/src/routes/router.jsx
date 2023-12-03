import App from '../App';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import BookInfo from '../pages/BookInfo';
import SignUp from '../pages/SignUp';
import Search from '../pages/Search';
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
          { index: true, element: <div>main</div> },
          { path: 'signup', element: <SignUp /> },
          { path: 'login', element: <LogIn /> },
          { path: 'search', element: <Search /> },
          { path: 'mypage', element: <MyPage /> },
          {
            path: 'user-info-edit',
            element: <UserInfoEditPage />,
          },
          {
            path: 'bkinfo', // book을 쓰면 페이지 로딩이 안 됩니다....
            element: <Outlet />,
            children: [
              {
                path: ':book_id',
                element: <BookInfo />,
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
