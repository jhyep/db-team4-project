import * as S from '../LogIn/style';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <S.Container>
        <S.Title>
          <h2>회원가입</h2>
        </S.Title>
        <S.InputWrapper>
          <S.InputBox type="text" placeholder="이름" />
          <S.InputBox type="text" placeholder="아이디" />
          <S.InputBox type="password" placeholder="비밀번호" />
          <S.InputBox type="password" placeholder="비밀번호 확인" />
        </S.InputWrapper>
        <Button width="100%">로그인</Button>
        <GuideWrap>
          <p>계정이 이미 있는 경우에는</p>
          <p>
            <Link to="/login">로그인</Link> 해주세요.
          </p>
        </GuideWrap>
      </S.Container>
    </>
  );
}

export default SignUp;

const GuideWrap = styled.div`
  color: #555555;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 20px 0 0 0;
  font-size: 14px;

  > p > a {
    color: #0076c0;
  }
`;
