import { useState } from 'react';
import styled from 'styled-components';
import Reviews from './Reviews';
import Ratings from './Ratings';
import Button from '../../components/Button';
import BookDescription from './BookDescription';
import ContentsBox from '../../components/ContentsBox';
import PageContainer from '../../components/PageContainer';

function BookInfo() {
  const [isRead, setIsRead] = useState(false);
  const [isRating, setIsRating] = useState(true);

  function handleButtonClick() {
    setIsRead((prevState) => !prevState);
  }

  function handleRatingsClick() {
    setIsRating(true);
  }

  function handleReviewClick() {
    setIsRating(false);
  }

  return (
    <PageContainer>
      <ContentsBox width="1024px">
        <BookDescription />
        {isRead ? (
          <Button width="130px" onClick={handleButtonClick}>
            - 내 서재에서 삭제
          </Button>
        ) : (
          <Button width="130px" onClick={handleButtonClick}>
            + 내 서재에 추가
          </Button>
        )}
      </ContentsBox>
      <ContentsBox width="1024px">
        <MenuContainer>
          <span onClick={handleRatingsClick}>Ratings </span>
          <span onClick={handleReviewClick}>Reviews </span>
          <span> --- 클릭 가능한 메뉴 입니다</span>
        </MenuContainer>

        {isRating ? <Ratings /> : <Reviews />}
      </ContentsBox>
    </PageContainer>
  );
}

export default BookInfo;

const MenuContainer = styled.div`
  cursor: pointer;
`;
