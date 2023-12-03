import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useSearch() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    searchWord: '',
    searchType: 'Keyword',
    searchSort: 'Accuracy',
    searchRecentPublish: '0',
    searchResult: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSearchForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (searchForm.searchWord === '') {
      alert('검색어를 입력해주세요.');
    } else {
      try {
        const response = await axios.post('/book/search', {
          query: searchForm.searchWord,
          queryType: searchForm.searchType,
          sort: searchForm.searchSort,
          recentPublishFilter: searchForm.searchRecentPublish,
        });

        if (response.data.length === 0) {
          alert('검색 결과가 없습니다.');
        }
        setSearchForm((prevForm) => ({
          ...prevForm,
          searchResult: response.data,
        }));
      } catch (err) {
        console.log('failed to request', err);
      }
    }
  }

  useEffect(() => {
    if (searchForm.searchResult.length > 0) {
      navigate('/search', {
        state: {
          searchWord: searchForm.searchWord,
          searchResult: searchForm.searchResult,
        },
      });
    }
  }, [searchForm.searchWord, searchForm.searchResult, navigate]);

  return { handleChange, handleSearch };
}
