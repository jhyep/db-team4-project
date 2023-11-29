import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as S from './HeaderMenuStyle';

function RightMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(function () {
    if (sessionStorage.getItem('userid') != null) {
      setIsLoggedIn(true);
      if (sessionStorage.getItem('userid') == 'admin') {
        setIsAdmin(true);
      }
      console.log('login!!!!!');
    }
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
    console.log('logout!');
  }

  return (
    <S.MenuContainer>
      {isLoggedIn ? (
        isAdmin ? (
          <>
            <Link to="/mypage">내 정보</Link>
            <div>도서 정보 수정</div>
            <div onClick={handleLogout}>로그아웃</div>
          </>
        ) : (
          <>
            <Link to="/mypage">내 정보</Link>
            <div onClick={handleLogout}>로그아웃</div>
          </>
        )
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/SignUp">회원가입</Link>
        </>
      )}
    </S.MenuContainer>
  );
}

export default RightMenu;
