import axios from 'axios';
import styled from 'styled-components';
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
    <Container>
      <img src={bkInfo.cover ? bkInfo.cover : ''} />
      <InfoContainer style={{ marginLeft: '20px' }}>
        <h2>{bkInfo.title}</h2>
        <div>
          저자 <Divider>|</Divider> {bkInfo.author}
        </div>
        <div>
          출판사 <Divider>|</Divider> {bkInfo.publisher}
        </div>
        <div>
          출간일 <Divider>|</Divider> {bkInfo.pubDate}
        </div>
        <div>
          카테고리 <Divider>|</Divider>{' '}
          {bkInfo.categoryName ? bkInfo.categoryName : '(없음)'}
        </div>
        <div>
          시리즈 <Divider>|</Divider>{' '}
          {bkInfo.seriesName ? bkInfo.seriesName : '(없음)'}
        </div>
      </InfoContainer>
    </Container>
  );
}

export default BookDescription;

const Container = styled.div`
  display: flex;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 5px;
`;

const Divider = styled.span`
  color: #ccc;
`;
