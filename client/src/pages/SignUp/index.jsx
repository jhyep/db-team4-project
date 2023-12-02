import * as S from '../LogIn/style';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (password != confirmpwd) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    try {
      const response = await axios.post('/user/signup', {
        userid: userid,
        password: password,
        username: username,
      });

      if (response.data.state) {
        alert('회원가입이 완료되었습니다');
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        if (response.data.cause == 'userid') {
          alert('이미 존재하는 아이디입니다.');
          window.location.reload();
        } else {
          alert('회원가입 도중 오류가 발생하였습니다.');
          window.location.reload();
        }
      }
    } catch (err) {
      alert('오류가 발생하였습니다. 나중에 다시 시도해주세요.');
      console.log('회원가입 오류', err);
    }
  }

  return (
    <>
      <S.Container>
        <S.Title>
          <h2>회원가입</h2>
        </S.Title>
        <S.InputWrapper>
          <S.InputBox
            type="text"
            placeholder="이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <S.InputBox
            type="password"
            placeholder="비밀번호 확인"
            value={confirmpwd}
            onChange={(e) => setConfirmpwd(e.target.value)}
          />
        </S.InputWrapper>
        <Button type="submit" onClick={handleSignUp} width="100%">
          회원가입
        </Button>
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
