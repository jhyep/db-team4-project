import { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchWord, setSearchWord] = useState('');
  const [searchType, setSearchType] = useState('Keyword');
  const [searchSort, setSearchSort] = useState('Accuracy');
  const [searchRecentPublish, setSearchRecentPublish] = useState('0');
  const [searchResult, setSearchResult] = useState([]);

  const onSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };
  const onSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const onSearchSortChange = (e) => {
    setSearchSort(e.target.value);
    console.log(searchSort);
  };
  const onSearchRecentPublishChange = (e) => {
    setSearchRecentPublish(e.target.value);
  };

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

  async function bookSearch(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/bookinfo/search', {
        query: searchWord,
        queryType: searchType,
        sort: searchSort,
        recentPublishFilter: searchRecentPublish,
      });

      setSearchResult(response.data);
    } catch (err) {
      console.log('failed to request', err);
    }
  }

  return (
    <>
      <div>
        <div>
          검색어:{' '}
          <input
            type="search"
            name="searchWord"
            onChange={onSearchWordChange}
            style={{ border: '1px solid' }}
          />
          <input
            type="radio"
            name="searchType"
            value="Keyword"
            onChange={onSearchTypeChange}
            defaultChecked
          />
          제목 + 저자
          <input
            type="radio"
            name="searchType"
            value="Title"
            onChange={onSearchTypeChange}
          />
          제목
          <input
            type="radio"
            name="searchType"
            value="Author"
            onChange={onSearchTypeChange}
          />
          저자
          <input
            type="radio"
            name="searchType"
            value="Publisher"
            onChange={onSearchTypeChange}
          />
          출판사
        </div>
        <div>
          정렬순:{' '}
          <select name="searchSort" onChange={onSearchSortChange}>
            <option value="Accuracy">관련도</option>
            <option value="PublishTime">출간일</option>
            <option value="Title">제목</option>
            <option value="SalesPoint">판매량</option>
            <option value="CustomerRating">고객평점(알라딘)</option>
            <option value="MyReviewCount">마이리뷰개수(알라딘)</option>
          </select>
        </div>
        <div>
          최근 n개월 내 출판:{' '}
          <input
            type="number"
            name="searchRecentPublish"
            min="0"
            max="60"
            step="1"
            defaultValue={'0'}
            onChange={onSearchRecentPublishChange}
            style={{ border: '1px solid' }}
          />{' '}
          (0은 제한 없음)
        </div>
        <div>
          <button
            type="button"
            onClick={bookSearch}
            style={{ border: '1px solid' }}
          >
            검색
          </button>
        </div>
        <div>
          {searchResult.map((item, index) => {
            return (
              <div key={`search-result-${index}`} style={{ marginTop: '1em' }}>
                <p>(____제목) {item.title}</p>
                <p>(____저자) {item.author}</p>
                <p>(__출판사) {item.publisher}</p>
                <p>(__출간일) {item.pubDate}</p>
                <p>
                  (카테고리) {item.categoryName ? item.categoryName : '(없음)'}
                </p>
                <p>(__시리즈) {item.seriesName ? item.seriesName : '(없음)'}</p>
                <button
                  type="button"
                  onClick={() => saveBook(item)}
                  style={{ border: '1px solid' }}
                >
                  {' '}
                  읽은책
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Search;
