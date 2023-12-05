import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Reviews from './Reviews';
import Ratings from './Ratings';
import axios from 'axios';
import Button from '../../components/Button';
import BookDescription from './BookDescription';
import ContentsBox from '../../components/ContentsBox';
import PageContainer from '../../components/PageContainer';

function BookInfo() {
  const params = useParams();
  const [isRead, setIsRead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRating, setIsRating] = useState(true);

  useEffect(() => {
    checkReadState();
  });

  async function handleAddReadButtonClick() {
    try {
      await axios.post('/book/insertRead', {
        userId: sessionStorage.getItem('userid'),
        isbn13: params.book_id,
      });
      setIsRead(true);
    } catch (err) {
      console.log('failed to check read state', err);
    }
  }

  async function handleRemoveReadButtonClick() {
    try {
      await axios.post('/book/deleteRead', {
        userId: sessionStorage.getItem('userid'),
        isbn13: params.book_id,
      });
      setIsRead(false);
    } catch (err) {
      console.log('failed to check read state', err);
    }
  }

  function handleRatingsClick() {
    setIsRating(true);
  }

  function handleReviewClick() {
    setIsRating(false);
  }

  async function checkReadState() {
    try {
      let response;
      response = await axios.post('/book/checkread', {
        userId: sessionStorage.getItem('userid'),
        isbn13: params.book_id,
      });
      setIsRead(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log('failed to check read state', err);
    }
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <PageContainer>
          <ContentsBox width="1024px">
            <BookDescription />
            <ButtonContainer>
              {isRead ? (
                <Button width="130px" onClick={handleRemoveReadButtonClick}>
                  - 내 서재에서 삭제
                </Button>
              ) : (
                <Button width="130px" onClick={handleAddReadButtonClick}>
                  + 내 서재에 추가
                </Button>
              )}
            </ButtonContainer>
          </ContentsBox>
          <ContentsBox width="1024px">
            <MenuContainer>
              <span onClick={handleRatingsClick}>Ratings </span>
              <span onClick={handleReviewClick}>Reviews </span>
            </MenuContainer>

            {isRating ? <Ratings /> : <Reviews />}
          </ContentsBox>
        </PageContainer>
      )}
    </>
  );
}

export default BookInfo;

const ButtonContainer = styled.div`
  text-align: right;
`;

const MenuContainer = styled.div`
  cursor: pointer;
`;
