import * as S from './HeaderMenuStyle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';

function RightMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useLayoutEffect(function () {
    if (sessionStorage.getItem('userid') != null) {
      setIsLoggedIn(true);
      if (sessionStorage.getItem('userid') == 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
  }

  return (
    <S.MenuContainer>
      {isLoggedIn ? (
        isAdmin ? (
          <>
            <div>관리 페이지</div>
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
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </S.MenuContainer>
  );
}

export default RightMenu;
