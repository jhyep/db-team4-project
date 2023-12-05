import styled from 'styled-components';
import Button from '../../../components/Button';
import { useInputCount } from '../../../hooks/useInputCount';

function Reviews() {
  const { inputCount, handleInput } = useInputCount();
  return (
    <>
      <form>
        <ReviewContainer>
          <h3>독후감 작성</h3>
          <Editor
            placeholder="2000자 이내의 독후감을 남겨보세요."
            maxLength="2000"
            onChange={handleInput}
          ></Editor>
          <Button type="submit">등록</Button>
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
