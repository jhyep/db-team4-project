import * as S from './style';
import axios from 'axios';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', {
        userid: userid,
        password: password,
      });

      if (response.data.state) {
        sessionStorage.setItem('userid', userid);
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        if (response.data.cause == 'password') {
          alert('올바르지 않은 비밀번호입니다.');
          window.location.reload();
        } else {
          alert('존재하지 않는 아이디입니다.');
          window.location.reload();
        }
      }
    } catch (err) {
      alert('오류가 발생하였습니다. 나중에 다시 시도해주세요.');
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
