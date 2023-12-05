import { useState, useLayoutEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import ContentsBox from '../../components/ContentsBox';
import BookSearch from './BookSearch';
import AdminSection from './AdminSection';
import ProfileSection from './ProfileSection';
import MyLibrarySection from './MyLibrarySection';

function MyPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem('userid') == 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <PageContainer>
      <ProfileSection />
      <BookSearch />
      {isAdmin ? (
        <ContentsBox width="500px">
          <AdminSection />
        </ContentsBox>
      ) : (
        <MyLibrarySection />
      )}
    </PageContainer>
  );
}

export default MyPage;
