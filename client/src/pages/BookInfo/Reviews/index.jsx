import styled from 'styled-components';
import Button from '../../../components/Button';
import { useInputCount } from '../../../hooks/useInputCount';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews(props) {
  const params = useParams();
  const { inputCount, handleInput } = useInputCount();
  const [isLogined, setIsLogined] = useState(false);
  const [myContent, setMyContent] = useState('');

  useEffect(() => {
    getBookInfo(params.book_id);
  }, [params.book_id]);

  async function getBookInfo(bookId) {
    try {
      if (sessionStorage.getItem('userid')) {
        setIsLogined(true);

        let response;
        response = await axios.post('/book/getmyreview', {
          isbn13: bookId,
          userId: sessionStorage.getItem('userid'),
        });

        if (response.data != null) {
          setMyContent(response.data.contents);
        }
      }
    } catch (err) {
      console.log('failed to get ratings', err);
    }
  }

  async function submitReview(e) {
    e.preventDefault();
    if (myContent.length === 0) {
      alert('한 글자 이상 입력해주세요.');
    } else {
      try {
        let response;
        response = await axios.post('/book/addreview', {
          contents: myContent,
          user_id: sessionStorage.getItem('userid'),
          isbn13: params.book_id,
        });

        if (response.data == 'insert') {
          alert('리뷰가 등록되었습니다.');
        } else if (response.data == 'update') {
          alert('리뷰를 수정하였습니다.');
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
    <>
      {isLogined ? (
        <ReviewContainer>
          {props.isRead ? (
            <form>
              <h3>독후감 작성</h3>
              <Editor
                placeholder="1300자 이내의 독후감을 남겨보세요."
                maxLength="1300"
                value={myContent}
                onChange={(e) => {
                  handleOnchange(e);
                }}
              ></Editor>
              <Button type="submit" onClick={submitReview}>
                등록
              </Button>
              <p>{inputCount}/1300</p>
            </form>
          ) : (
            <h4>내 서재에 추가 후 작성을 진행해주세요</h4>
          )}
        </ReviewContainer>
      ) : (
        <ReviewContainer>
          <h4>독후감을 작성하시려면 로그인해 주세요.</h4>
        </ReviewContainer>
      )}
    </>
  );
}

export default Reviews;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Editor = styled.textarea`
  resize: none;
  width: 300px;
  height: 100px;
  margin-top: 10px;
`;
