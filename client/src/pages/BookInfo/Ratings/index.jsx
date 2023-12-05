import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useInputCount } from '../../../hooks/useInputCount';

function Ratings() {
  const params = useParams();
  const [bkRate, setBkRate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { inputCount, handleInput } = useInputCount();

  useEffect(() => {
    getBookInfo(params.book_id);
  }, [params.book_id]);

  async function getBookInfo(bookId) {
    try {
      let response;
      response = await axios.post('/book/rate', {
        itemId: bookId,
      });
      setBkRate(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log('failed to request', err);
    }
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {bkRate.map((item, index) => {
            return (
              <div key={`search-result-${index}`} style={{ marginTop: '1em' }}>
                <p>(__ID) {item.userId}</p>
                <p>(평점) {item.rating}</p>
                <p>(내용) {item.comment}</p>
              </div>
            );
          })}
          <form>
            <RatingContainer>
              <h3>한줄평 작성</h3>
              <span>평점: </span>
              <input
                type="number"
                name="searchRecentPublish"
                min="0"
                max="10"
                step="1"
                defaultValue={'0'}
                onChange={() => {}}
                style={{ border: '1px solid', width: '300px' }}
              />
              <Editor
                placeholder="200자 이내의 간단한 리뷰를 남겨보세요."
                maxLength="200"
                onChange={handleInput}
              ></Editor>
              <p>{inputCount}/200</p>
              <Button type="submit">등록</Button>
            </RatingContainer>
          </form>
        </>
      )}
    </>
  );
}

export default Ratings;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Editor = styled.textarea`
  width: 300px;
  height: 100px;
  margin-top: 10px;
`;
