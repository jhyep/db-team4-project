import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
            <Link to={`/bkinfo/${searchResult[index].isbn13}`}>
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
            </Link>
          </S.InfoContainer>
        ))}
      </S.SearchResultContainer>
    </PageContainer>
  );
}

export default Search;
