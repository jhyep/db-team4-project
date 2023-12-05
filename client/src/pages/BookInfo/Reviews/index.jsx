import styled from 'styled-components';
import Button from '../../../components/Button';
import { useInputCount } from '../../../hooks/useInputCount';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Reviews() {
  const params = useParams();
  const { inputCount, handleInput } = useInputCount();
  const [myContent, setMyContent] = useState('');

  async function submitReview(e) {
    e.preventDefault();

    try {
      let response;
      response = await axios.post('/book/addreview', {
        contents: myContent,
        user_id: sessionStorage.getItem('userid'),
        isbn13: params.book_id,
      });

      console.log(response);

      if (response.data == true) {
        alert('리뷰가 등록되었습니다.');
        window.location.reload();
      } else {
        alert('리뷰를 이미 작성하셨습니다.');
        window.location.reload();
      }
    } catch (err) {
      console.log('failed to add rating', err);
    }
  }

  return (
    <>
      <form>
        <ReviewContainer>
          <h3>독후감 작성</h3>
          <Editor
            placeholder="2000자 이내의 독후감을 남겨보세요."
            maxLength="2000"
            onChange={(e) => {
              handleInput(e);
              setMyContent(e.target.value);
            }}
          ></Editor>
          <Button type="submit" onClick={submitReview}>
            등록
          </Button>
          <p>{inputCount}/2000</p>
        </ReviewContainer>
      </form>
    </>
  );
}

export default Reviews;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Editor = styled.textarea`
  width: 300px;
  height: 100px;
  margin-top: 10px;
`;
