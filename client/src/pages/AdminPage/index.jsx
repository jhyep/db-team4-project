import { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [isbn13ForDelete, setIsbn13ForDelete] = useState('');
  const [isbn13ForAdd, setIsbn13ForAdd] = useState('');

  async function handleDelete(e) {
    e.prevenDefault();

    try {
      const response = await axios.post('/bookinfo/delete', {
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

  async function handleAdd(e) {
    e.prevenDefault();

    try {
      const response = await axios.post('/bookinfo/add', {
        isbn13: isbn13ForAdd,
      });
      if (response.data.state) {
        alert('도서 추가 성공');
        window.location.reload();
      } else {
        alert('도서 추가 오류');
      }
    } catch (err) {
      console.log('Book Add error ', err);
    }
  }

  return (
    <div>
      <h2>도서 정보 추가</h2>
      <label>
        ISBN-13:
        <input
          type="text"
          value={isbn13ForAdd}
          onChange={(e) => setIsbn13ForAdd(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleAdd}>
        Submit
      </button>
      <h2>도서 정보 삭제</h2>
      <label>
        ISBN-13:
        <input
          type="text"
          value={isbn13ForDelete}
          onChange={(e) => setIsbn13ForDelete(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleDelete}>
        Submit
      </button>
    </div>
  );
}

export default AdminPage;
