import { useState } from 'react';
import * as S from './HeaderMenuStyle';

function RightMenu() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false); // todo: 로그인 전역 상태값으로 수정
  return (
    <S.MenuContainer>
      {isLoggedIn ? (
        <>
          <div>내 정보</div>
          <div>로그아웃</div>
        </>
      ) : (
        <>
          <div>로그인</div>
          <div>회원가입</div>
        </>
      )}
    </S.MenuContainer>
  );
}

export default RightMenu;
