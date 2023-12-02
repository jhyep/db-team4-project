import { useState, useEffect } from 'react';
import axios from 'axios';

function MyLibrary() {
  const [reads, setReads] = useState([]);

  useEffect(() => {
    const fetchReads = async () => {
      const userid = sessionStorage.getItem('userid');
      try {
        const response = await axios.post('/bookinfo/getReads', {
          userid: userid,
        });

        setReads(response.data.rows);
      } catch (error) {
        console.log('Error ', error);
      }
    };
    fetchReads();
  }, []);

  const writeReview = async (isbn13, reviewContent) => {
    const userid = sessionStorage.getItem('userid');

    try {
      const response = await axios.post('/bookinfo/writeReview', {
        userid: userid,
        isbn13: isbn13,
        contents: reviewContent,
      });
      if (response.data.state) {
        alert('리뷰 작성 성공');
      } else {
        alert('리뷰 작성 실패');
      }
    } catch (err) {
      console.log('Error ', err);
    }
  };

  const openReviewModal = (book) => {
    const reviewContent = window.prompt(
      `리뷰를 작성하세요 (도서: ${book.TITLE})`
    );
    if (reviewContent !== null) {
      writeReview(book.ISBN13, reviewContent);
    }
  };

  return (
    <div>
      <h2>My Library</h2>
      <ul>
        {reads && reads.length > 0 ? (
          reads.map((read) => (
            <li key={read.ISBN13}>
              <p>제목: {read.TITLE}</p>
              <p>저자: {read.AUTHOR}</p>
              <button
                type="button"
                onClick={() => openReviewModal(read)}
                style={{ border: '1px solid' }}
              >
                {' '}
                리뷰작성
              </button>
            </li>
          ))
        ) : (
          <p>읽은 책이 없습니다.</p>
        )}
      </ul>
    </div>
  );
  /*const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const userid = sessionStorage.getItem('userid');
    const storedBooks = JSON.parse(localStorage.getItem(userid)) || [];
    setUserBooks(storedBooks);
  }, []);

  const writeReview = (isbn13, reviewContent) => {
    const userid = sessionStorage.getItem('userid');
    const updatedBooks = userBooks.map((book) => {
      if (book.isbn13 === isbn13) {
        return { ...book, reviewContent };
      }
      return book;
    });

    localStorage.setItem(userid, JSON.stringify(updatedBooks));
    setUserBooks(updatedBooks);
  };

  const openReviewModal = (book) => {
    const reviewContent = window.prompt(
      `리뷰를 작성하세요 (도서: ${book.title})`
    );
    if (reviewContent !== null) {
      writeReview(book.isbn13, reviewContent);
    }
  };

  async function displayBook(book) {
    if (!sessionStorage.getItem('userid')) {
      return alert('로그인 해주세요!');
    }
    try {
      const response = await axios.post('/bookinfo/save', {
        book: book,
        userid: sessionStorage.getItem('userid'),
      });
      if (response.data.state) {
        alert('저장 성공');
      } else {
        alert('이미 저장한 도서입니다');
      }
    } catch (err) {
      console.log('error ', err);
    }
  }

  return (
    <div>
      <h2>My Library</h2>
      <ul>
        {userBooks.map((book, index) => (
          <li key={index}>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <button
              type="button"
              onClick={() => openReviewModal(book)}
              style={{ border: '1px solid' }}
            >
              {' '}
              리뷰작성
            </button>
          </li>
        ))}
      </ul>
    </div>
  );*/
}

export default MyLibrary;
