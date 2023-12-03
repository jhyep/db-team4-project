import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../styles/palette';
import PageContainer from '../../components/PageContainer';
import LinedSpan from '../../components/LinedSpan';
import ContentsBox from '../../components/ContentsBox';
import { useState, useEffect } from 'react';
function MyPage() {
  const initialName = sessionStorage.getItem('name') || '김철수';

  const [name, setName] = useState(initialName);

  useEffect(() => {
    const updatedName = sessionStorage.getItem('name') || '김철수';
    setName(updatedName);
  }, [name]);

  const nameStyle = {
    fontSize: '28px',
  };
  const buttonStyle = {
    backgroundColor: '#e1e1e1',
    borderRadius: '2px',
    color: `${palette.lightBlack}`,
    padding: '4px 10px',
    fontSize: '16px',
  };

  return (
    <PageContainer>
      <ProfileWrapper>
        <ProfileContainer>
          <img
            src="/src/assets/images/profile-image.png"
            alt="프로필"
            width="70px"
          />
          <h2 style={nameStyle}>{name}</h2>
        </ProfileContainer>
        <button style={buttonStyle}>
          <Link to="/user-info-edit">정보 수정</Link>
        </button>
      </ProfileWrapper>
      <ContentsBox width="1024px">
        <LinedSpan>내가 읽은 책</LinedSpan>
      </ContentsBox>
    </PageContainer>
  );
}

export default MyPage;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
