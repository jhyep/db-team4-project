import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookDescription() {
  const params = useParams();
  const [bkInfo, setBkInfo] = useState('');

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
    } catch (err) {
      console.log('failed to request', err);
    }
  }

  return (
    <>
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
    </>
  );
}

export default BookDescription;
