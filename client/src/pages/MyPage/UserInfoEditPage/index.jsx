import { Link } from 'react-router-dom';
import * as S from './style';
import Button from '../../../components/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserInfoEditPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');

  const navigate = useNavigate();

  async function userUpdate(e) {
    e.preventDefault();

    if (!username && !password) {
      return alert('수정할 정보를 입력해주세요');
    }

    if (password != confirmpwd) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    try {
      const response = await axios.post('/user/update', {
        userid: sessionStorage.getItem('userid'),
        username: username,
        password: password,
      });
      if (response.data.state) {
        alert('회원 정보 수정이 완료되었습니다.');
        navigate('/');
        window.location.reload();
      } else {
        alert('회원 정보 수정 오류');
      }
    } catch (err) {
      console.log('Update error ', err);
    }
  }

  async function userDelete(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/user/delete', {
        userid: sessionStorage.getItem('userid'),
      });
      if (response.data.state) {
        alert('회원 탈퇴가 완료되었습니다.');
        sessionStorage.clear();
        window.location.reload();
      } else {
        alert('회원 탈퇴 오류');
      }
    } catch (err) {
      console.log('Delete Error ', err);
    }
  }

  return (
    <>
      <S.Container>
        <S.LeftContainer>
          <S.Title>
            <h2>회원정보 수정</h2>
          </S.Title>
          <S.InputWrapper>
            <S.InputBox
              type="text"
              placeholder="이름 변경"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <S.InputBox
              type="password"
              placeholder="비밀번호 변경"
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
          <Button type="submit" onClick={userUpdate} width="100%">
            변경하기
          </Button>
        </S.LeftContainer>
        <S.RightContainer>
          <p>
            또는 회원 탈퇴를 원하시나요?{' '}
            <Link to="/" onClick={userDelete}>
              탈퇴하기
            </Link>
          </p>
          <S.DeleteAlert>
            회원 탈퇴 즉시 회원 정보는 모두 삭제되며, <br></br> 재가입시에도
            복원되지 않습니다.
          </S.DeleteAlert>
        </S.RightContainer>
      </S.Container>
    </>
  );
}

export default UserInfoEditPage;
