import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import LinedSpan from '../../../components/LinedSpan';

function AdminSection() {
  const [isbn13ForDelete, setIsbn13ForDelete] = useState('');

  async function handleDelete() {
    try {
      const response = await axios.post('/book/delete', {
        isbn13: isbn13ForDelete,
      });
      if (response.data.state) {
        alert('도서 정보 삭제 성공');
        window.location.reload();
      } else {
        alert('도서 정보 삭제 오류');
      }
    } catch (err) {
      console.log('Book delete error ', err);
    }
  }

  return (
    <>
      <LinedSpan>도서 정보 삭제</LinedSpan>
      <InputContainer>
        <span>ISBN-13: </span>
        <input
          type="text"
          value={isbn13ForDelete}
          style={{ border: '1px solid' }}
          onChange={(e) => setIsbn13ForDelete(e.target.value)}
        />
        <DeleteButton type="submit" onClick={handleDelete}>
          Submit
        </DeleteButton>
      </InputContainer>
    </>
  );
}

export default AdminSection;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  background-color: #e1e1e1;
  border-radius: 2px;
  color: ${palette.lightBlack};
  margin-left: 5px;
  padding: 4px 10px;
  font-size: 14px;
`;
