import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';

function ProfileSection() {
  const initialName = sessionStorage.getItem('name') || '김철수';
  const [name, setName] = useState(initialName);

  useEffect(() => {
    const updatedName = sessionStorage.getItem('name') || '김철수';
    setName(updatedName);
  }, [name]);

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <img
          src="/src/assets/images/profile-image.png"
          alt="프로필"
          width="70px"
        />
        <h2 style={{ fontSize: '28px' }}>{name}</h2>
      </ProfileContainer>
      <EditButton>
        <Link to="/user-info-edit">정보 수정</Link>
      </EditButton>
    </ProfileWrapper>
  );
}

export default ProfileSection;

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

const EditButton = styled.button`
  background-color: #e1e1e1;
  border-radius: 2px;
  color: ${palette.lightBlack};
  padding: 4px 10px;
  font-size: 16px;
`;
