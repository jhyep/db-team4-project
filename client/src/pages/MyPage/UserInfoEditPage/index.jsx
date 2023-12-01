import { Link } from 'react-router-dom';
import * as S from './style';
import Button from '../../../components/Button';

function UserInfoEditPage() {
  return (
    <>
      <S.Container>
        <S.LeftContainer>
          <S.Title>
            <h2>회원정보 수정</h2>
          </S.Title>
          <S.InputWrapper>
            <S.InputBox type="text" placeholder="이름 변경" />
            <S.InputBox type="password" placeholder="비밀번호 변경" />
            <S.InputBox type="password" placeholder="비밀번호 확인" />
          </S.InputWrapper>
          <Button width="100%">변경하기</Button>
        </S.LeftContainer>
        <S.RightContainer>
          <p>
            또는 회원 탈퇴를 원하시나요? <Link to="/">탈퇴하기</Link>
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
