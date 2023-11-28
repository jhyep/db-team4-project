import * as S from './style';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function LogIn() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        userid: userid,
        password: password,
      });
      console.log('서버 응답: ', response.data);
    } catch (err) {
      console.log('로그인 오류', err);
    }
  }

  return (
    <>
      <S.Container>
        <S.Title>
          <h2>로그인</h2>
        </S.Title>
        <S.InputWrapper>
          <S.InputBox
            type="text"
            placeholder="아이디"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          <S.InputBox
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.InputWrapper>
        <Button type="submit" onClick={handleLogin} width="100%">
          로그인
        </Button>
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
