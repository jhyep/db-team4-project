import * as S from './style';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookInfo() {
  const params = useParams();
  const [bkInfo, setBkInfo] = useState('');
  const [bkRate, setBkRate] = useState([]);

  useEffect(() => {
    getBookInfo(params.book_id);
  }, [params.book_id]);

  async function getBookInfo(bookId) {
    try {
      let response;

      response = await axios.post('/book/info', {
        itemId: bookId,
      });
      setBkInfo(response.data);

      response = await axios.post('/book/rate', {
        itemId: bookId,
      });
      console.log(response.data);
      setBkRate(response.data);
    } catch (err) {
      console.log('failed to request', err);
    }
  }

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
        </div>
      </S.BkInfoContainer>
      <S.BkReviewContainer>
        <h2>Rates</h2>
        {bkRate.map((item, index) => {
          return (
            <div key={`search-result-${index}`} style={{ marginTop: '1em' }}>
              <p>(__ID) {item.userId}</p>
              <p>(평점) {item.rating}</p>
              <p>(내용) {item.comment}</p>
            </div>
          );
        })}
      </S.BkReviewContainer>
    </>
  );
}

export default BookInfo;
