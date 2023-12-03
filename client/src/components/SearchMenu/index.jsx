import { useSearch } from '../../hooks/useSearch';
import styled from 'styled-components';
import SearchBar from './SearchBar';

function SearchMenu(props) {
  const searchRange = ['제목+저자', '제목', '저자', '출판사'];
  const sortOptions = [
    { value: 'Accuracy', label: '관련도' },
    { value: 'PublishTime', label: '출간일' },
    { value: 'Title', label: '제목' },
    { value: 'SalesPoint', label: '판매량' },
    { value: 'CustomerRating', label: '고객평점(알라딘)' },
    { value: 'MyReviewCount', label: '마이리뷰개수(알라딘)' },
  ];
  const { handleChange, handleSearch } = useSearch();

  return (
    <FormContainer $width={props.width} onSubmit={handleSearch}>
      <SearchBar onChange={handleChange} />
      <Condition $leftPadding={props.leftPadding}>
        <FormSpan>검색범위: </FormSpan>
        {searchRange.map((item, index) => {
          return (
            <label key={`range-${index}`}>
              <input
                type="radio"
                name="searchType"
                value="Keyword"
                onChange={handleChange}
                defaultChecked={index === 0}
              />
              <FormSpan>{item}</FormSpan>
            </label>
          );
        })}
      </Condition>
      <Condition $leftPadding={props.leftPadding}>
        <FormSpan>정렬순: </FormSpan>
        <select
          name="searchSort"
          onChange={handleChange}
          style={{ border: '1px solid' }}
        >
          {sortOptions.map((option, index) => (
            <option key={`option-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Condition>
      <Condition $leftPadding={props.leftPadding}>
        <FormSpan>최근 N개월 내 출판: </FormSpan>
        <input
          type="number"
          name="searchRecentPublish"
          min="0"
          max="60"
          step="1"
          defaultValue={'0'}
          onChange={handleChange}
          style={{ border: '1px solid' }}
        />{' '}
        (0은 제한 없음)
      </Condition>
    </FormContainer>
  );
}

export default SearchMenu;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: ${(props) => props.$width || ''};
`;

const Condition = styled.div`
  padding-left: ${(props) => props.$leftPadding || ''};
`;

const FormSpan = styled.span`
  margin-right: 30px;
`;
