import { useState } from 'react';
import * as S from './style';
import Ratings from './Ratings';
import Button from '../../components/Button';
import BookDescription from './BookDescription';
import Reviews from './Reviews';

function BookInfo() {
  const [isRead, setIsRead] = useState(false);

  function handleButtonClick() {
    setIsRead((prevState) => !prevState);
  }

  return (
    <>
      <S.BkInfoContainer>
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
      </S.BkInfoContainer>
      <S.BkReviewContainer>
        <h2>Rates</h2>
        <Ratings />
      </S.BkReviewContainer>
      <S.BkReviewContainer>
        <Reviews />
      </S.BkReviewContainer>
    </>
  );
}

export default BookInfo;
