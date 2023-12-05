import { Link } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { CheckIcon } from '../../../assets/icons/CheckIcon';
import axios from 'axios';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import LinedSpan from '../../../components/LinedSpan';
import ContentsBox from '../../../components/ContentsBox';

function MyLibrarySection() {
  const [reads, setReads] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useLayoutEffect(() => {
    const fetchReads = async () => {
      const userid = sessionStorage.getItem('userid');
      try {
        const response = await axios.post('/book/getReads', {
          userid: userid,
        });

        setReads(response.data.rows);
      } catch (error) {
        console.log('Error ', error);
      }
    };
    fetchReads();
  }, []);

  function handleClick() {
    setIsSorted((prevState) => !prevState);
  }

  return (
    <ContentsBox width="1024px">
      <LinedSpan>내가 읽은 책</LinedSpan>
      <SortMenu onClick={handleClick}>
        <CheckIcon color={isSorted ? `${palette.lightBlack}` : '#ccc'} />
        <span style={{ color: isSorted ? `${palette.lightBlack}` : '#ccc' }}>
          {' '}
          평균 평점 순으로 정렬
        </span>
      </SortMenu>

      <BookList>
        {reads && reads.length > 0 ? (
          reads.map((read) => (
            <li key={read.ISBN13}>
              <Link to={`/bkinfo/${read.ISBN13}`}>
                <BookItem>
                  <img
                    src="/src/assets/images/stack-of-books.png"
                    alt="books"
                    width="20px"
                  />
                  <p>{read.TITLE}</p>
                </BookItem>
              </Link>
            </li>
          ))
        ) : (
          <NoBookQuote>읽은 책이 없습니다.</NoBookQuote>
        )}
      </BookList>
    </ContentsBox>
  );
}

export default MyLibrarySection;

const SortMenu = styled.div`
  color: #ccc;
  cursor: pointer;
  text-align: right;
`;
const BookList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;

  li:hover {
    text-decoration: underline;
  }
`;

const BookItem = styled.div`
  display: flex;
  gap: 8px;
`;

const NoBookQuote = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 18px;
  font-family: GmarketSansMedium;
`;
