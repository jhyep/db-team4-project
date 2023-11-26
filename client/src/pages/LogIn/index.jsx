import * as S from './style';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

function LogIn() {
  return (
    <>
      <S.Container>
        <S.Title>
          <h2>로그인</h2>
        </S.Title>
        <S.InputWrapper>
          <S.InputBox type="text" placeholder="아이디" />
          <S.InputBox type="password" placeholder="비밀번호" />
        </S.InputWrapper>
        <Button width="100%">로그인</Button>
        <S.SuggestionWrap>
          <p>
            아직 회원이 아니신가요?<Link to="/signup">회원가입</Link>
          </p>
        </S.SuggestionWrap>
      </S.Container>
    </>
  );
}

export default LogIn;
