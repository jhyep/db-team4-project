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
    setIsRead((prevState) => !prevState);
    try {
      await axios.post('/book/insertread', {
        userId: sessionStorage.getItem('userid'),
        isbn13: params.book_id,
      });
      setIsRead(false.data);
    } catch (err) {
      console.log('failed to check read state', err);
    }
  }

  async function handleRemoveReadButtonClick() {
    setIsRead((prevState) => !prevState);
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
            {isRead ? (
              <Button width="130px" onClick={handleRemoveReadButtonClick}>
                - 내 서재에서 삭제
              </Button>
            ) : (
              <Button width="130px" onClick={handleAddReadButtonClick}>
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
      )}
    </>
  );
}

export default BookInfo;

const MenuContainer = styled.div`
  cursor: pointer;
`;
