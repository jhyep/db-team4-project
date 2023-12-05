import * as S from './style';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RatingModal from '../../Modal/modal';

function BookInfo() {
  const params = useParams();
  const [bkInfo, setBkInfo] = useState('');
  const [bkRate, setBkRate] = useState([]);
  const [RvInfo, setRvInfo] = useState('');

  useEffect(() => {
    getBookInfo(params.book_id, params.user_id);
  }, [params.book_id, params.user_id]);

  async function getBookInfo(bookId, userId) {
    try {
      let response;

      response = await axios.post('/book/info', {
        itemId: bookId,
      });
      setBkInfo(response.data);

      if (userId) {
        response = await axios.post('/book/loadReview', {
          isbn13: bookId,
          userid: userId,
        });
        setRvInfo(response.data.rows[0]);
      } else {
        response = await axios.post('/book/rate', {
          itemId: bookId,
        });
        setBkRate(response.data);
      }
    } catch (err) {
      console.log('failed to request', err);
    }
  }

  async function readBook(book) {
    if (!sessionStorage.getItem('userid')) {
      return alert('로그인 해주세요!');
    }
    try {
      const response = await axios.post('/book/read', {
        book: book,
        userid: sessionStorage.getItem('userid'),
      });
      if (response.data.state) {
        alert('저장 성공');
      } else {
        alert('이미 저장한 도서입니다');
      }
    } catch (err) {
      console.log('error ', err);
    }
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <S.BkInfoContainer>
        <img src={bkInfo.cover ? bkInfo.cover : ''} />
        <div style={{ marginLeft: '20px' }}>
          <div>제목: {bkInfo.title}</div>
          <div>저자: {bkInfo.author}</div>
          <div>출간일: {bkInfo.pubDate}</div>
          <div>출판사: {bkInfo.publisher}</div>
          <div>
            카테고리: {bkInfo.categoryName ? bkInfo.categoryName : '(없음)'}
          </div>
          <div>시리즈: {bkInfo.seriesName ? bkInfo.seriesName : '(없음)'}</div>
          <button type="button" onClick={() => readBook(bkInfo)}>
            서재에 추가
          </button>
        </div>
      </S.BkInfoContainer>
      {!params.user_id && (
        <S.BkReviewContainer>
          <h2>Rates</h2>
          <button onClick={openModal}>한줄평 추가</button>
          <RatingModal
            book={bkInfo}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            isReviewModal={false}
          />{' '}
          <button type="button" onClick={() => readBook(bkInfo)}>
            나의 한줄평
          </button>
          {bkRate.map((item, index) => {
            return (
              <div key={`search-result-${index}`} style={{ marginTop: '1em' }}>
                <p>(ID) {item.userId}</p>
                <p>(평점) {item.rating}</p>
                <p>(내용) {item.comment}</p>
              </div>
            );
          })}
        </S.BkReviewContainer>
      )}
      {params.user_id && (
        <S.BkReviewContainer>
          <h2>나의 독후감</h2>
          <button onClick={openModal}>기록 추가</button>
          <RatingModal
            book={bkInfo}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            isReviewModal={true}
          />{' '}
          <div style={{ marginTop: '1em' }}>
            <p>(내용) {RvInfo.CONTENTS}</p>
          </div>
        </S.BkReviewContainer>
      )}
    </>
  );
}

export default BookInfo;
