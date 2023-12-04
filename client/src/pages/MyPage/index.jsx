import { Link } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import palette from '../../styles/palette';
import PageContainer from '../../components/PageContainer';
import LinedSpan from '../../components/LinedSpan';
import ContentsBox from '../../components/ContentsBox';
import AdminSection from './AdminSection';

function MyPage() {
  const initialName = sessionStorage.getItem('name') || '김철수';
  const [name, setName] = useState(initialName);
  const [reads, setReads] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updatedName = sessionStorage.getItem('name') || '김철수';
    setName(updatedName);
  }, [name]);

  useLayoutEffect(() => {
    if (sessionStorage.getItem('userid') == 'admin') {
      setIsAdmin(true);
    }
    const fetchReads = async () => {
      const userid = sessionStorage.getItem('userid');
      try {
        const response = await axios.post('/book/getReads', {
          userid: userid,
        });

        setReads(response.data.rows);
      } catch (error) {
        console.log('Error ', error);
      }
    };
    fetchReads();
  }, []);

  return (
    <PageContainer>
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
      {isAdmin ? (
        <ContentsBox width="500px">
          <AdminSection />
        </ContentsBox>
      ) : (
        <ContentsBox width="1024px">
          <LinedSpan>내가 읽은 책</LinedSpan>
          <ul>
            {reads && reads.length > 0 ? (
              reads.map((read) => (
                <li key={read.ISBN13}>
                  <p>제목: {read.TITLE}</p>
                </li>
              ))
            ) : (
              <p>읽은 책이 없습니다.</p>
            )}
          </ul>
        </ContentsBox>
      )}
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

const EditButton = styled.button`
  background-color: #e1e1e1;
  border-radius: 2px;
  color: ${palette.lightBlack};
  padding: 4px 10px;
  font-size: 16px;
`;
