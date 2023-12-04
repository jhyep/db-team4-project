import { useState } from 'react';
import axios from 'axios';

function AdminPage() {
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
    <div>
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
