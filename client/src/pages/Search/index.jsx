import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './style';
import SearchMenu from '../../components/SearchMenu';
import PageContainer from '../../components/PageContainer';
import ContentsBox from '../../components/ContentsBox';

function Search() {
  const location = useLocation();
  const { searchWord, searchResult } = location.state || {};
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function handleMouseEnter(index) {
    setHoveredIndex(index);
  }

  async function saveBook(book) {
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
  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  return (
    <PageContainer>
      <S.Container>
        <ContentsBox width="1024px">
          <SearchMenu />
        </ContentsBox>
      </S.Container>

      <S.SearchWordSpan>&apos;{searchWord}&apos;</S.SearchWordSpan>
      <span> 에 대한 검색 결과입니다.</span>
      <S.SearchResultContainer>
        {searchResult.map((result, index) => (
          <S.InfoContainer
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <S.Cover
              src={result.cover}
              alt="커버"
              width="150px"
              height="220px"
            />
            <S.Title
              style={{
                textDecoration: hoveredIndex === index ? 'underline' : 'none',
              }}
            >
              {result.title}
            </S.Title>
            <S.Author>{result.author}</S.Author>
          </S.InfoContainer>
        ))}
      </S.SearchResultContainer>
    </PageContainer>
  );
}

export default Search;
