import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '40%',
    padding: '20px',
  },
};

Modal.setAppElement('#root');

const RatingModal = ({ book, isOpen, onRequestClose, isReviewModal }) => {
  const [comment, setComment] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setRating] = useState('');

  const handleCommentSubmit = async () => {
    try {
      await axios.post('/book/read', {
        book: book,
        userid: sessionStorage.getItem('userid'),
      });

      const response = await axios.post('/book/writeComment', {
        userid: sessionStorage.getItem('userid'),
        isbn13: book.isbn13,
        contents: comment,
        rating: rating,
      });
      if (response.data.state) {
        alert('한줄평 작성 성공');
      } else {
        alert('한줄평 작성 실패');
      }
      window.location.reload();
    } catch (err) {
      console.log('Error ', err);
    }
    onRequestClose();
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post('/book/writeReview', {
        userid: sessionStorage.getItem('userid'),
        isbn13: book.isbn13,
        contents: contents,
      });
      if (response.data.state) {
        alert('독후감 작성 성공');
      } else {
        alert('독후감 작성 실패');
      }
      window.location.reload();
    } catch (err) {
      console.log('Error ', err);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Book Detail Modal"
    >
      <h2>{book.title}</h2>
      {!isReviewModal ? (
        <>
          <label>평점:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br />
          <label>한줄평:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <button onClick={handleCommentSubmit}>한줄평 제출</button>
        </>
      ) : (
        <>
          <label>리뷰:</label>
          <input
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <br />
          <button onClick={handleReviewSubmit}>독후감 제출</button>
        </>
      )}
    </Modal>
  );
};

export default RatingModal;
