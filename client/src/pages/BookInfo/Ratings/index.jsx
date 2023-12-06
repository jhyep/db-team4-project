import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useInputCount } from '../../../hooks/useInputCount';

function Ratings(props) {
  const params = useParams();
  const [bkRate, setBkRate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const { inputCount, handleInput } = useInputCount();
  const [myRate, setMyRate] = useState(0);
  const [myContent, setMyContent] = useState('');

  useEffect(() => {
    getBookInfo(params.book_id);
  }, [params.book_id]);

  async function getBookInfo(bookId) {
    try {
      let response;
      response = await axios.post('/book/getrate', {
        itemId: bookId,
      });
      setBkRate(response.data);

      if (sessionStorage.getItem('userid')) {
        setIsLogined(true);

        response = await axios.post('/book/getmyrate', {
          isbn13: bookId,
          userId: sessionStorage.getItem('userid'),
        });

        if (response.data != null) {
          setMyRate(response.data.rating);
          setMyContent(response.data.contents);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log('failed to get ratings', err);
    }
  }

  async function submitRating(e) {
    e.preventDefault();
    if (myContent.length === 0) {
      alert('한 글자 이상 입력해주세요.');
    } else {
      try {
        let response;
        response = await axios.post('/book/addrate', {
          rating: myRate,
          contents: myContent,
          user_id: sessionStorage.getItem('userid'),
          isbn13: params.book_id,
        });

        if (response.data == 'insert') {
          alert('한줄평이 등록되었습니다.');
        } else if (response.data == 'update') {
          alert('한줄평을 수정하였습니다.');
        }
        window.location.reload();
      } catch (err) {
        console.log('failed to add rating', err);
      }
    }
  }

  function handleOnchange(e) {
    handleInput(e);
    setMyContent(e.target.value);
  }

  return (
    <Container>
      {isLoading ? (
        <p>로딩 중입니다.</p>
      ) : (
        <>
          <h3>다른 사용자들의 review</h3>
          {bkRate.map((item, index) => {
            return (
              <div key={`search-result-${index}`}>
                <p>
                  ID <Divider>|</Divider> {item.userId}
                </p>
                <p>
                  평점 <Divider>|</Divider> {item.rating}
                </p>
                <p>
                  내용 <Divider>|</Divider> {item.comment}
                </p>
              </div>
            );
          })}
          {isLogined ? (
            <form>
              {props.isRead && (
                <RatingContainer>
                  <h3>한줄평 작성</h3>
                  <span>평점: </span>
                  <input
                    type="number"
                    name="searchRecentPublish"
                    min="0"
                    max="10"
                    step="1"
                    value={myRate}
                    onChange={(e) => {
                      setMyRate(e.target.value);
                    }}
                    style={{ border: '1px solid', width: '300px' }}
                  />
                  <Editor
                    placeholder="200자 이내의 간단한 리뷰를 남겨보세요."
                    maxLength="200"
                    value={myContent}
                    onChange={(e) => {
                      handleOnchange(e);
                    }}
                  ></Editor>
                  <p>{inputCount}/200</p>
                  <Button type="submit" onClick={submitRating}>
                    등록
                  </Button>
                </RatingContainer>
              )}
            </form>
          ) : (
            <RatingContainer>
              <h4>한줄평을 작성하시려면 로그인해 주세요.</h4>
            </RatingContainer>
          )}
        </>
      )}
    </Container>
  );
}

export default Ratings;

const Container = styled.div`
  margin-top: 20px;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Editor = styled.textarea`
  resize: none;
  width: 300px;
  height: 100px;
  margin-top: 10px;
`;

const Divider = styled.span`
  color: #ccc;
`;
