import * as S from '../LogIn/style';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');
  const [username, setUsername] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();

    if (password != confirmpwd) {
      return alert('일치하지 않는 비밀번호');
    }

    try {
      const response = await axios.post('http://localhost:5173/signup', {
        userid: userid,
        password: password,
        username: username,
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
