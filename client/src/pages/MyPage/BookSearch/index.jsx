import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import LinedSpan from '../../../components/LinedSpan';
import SearchBar from '../../../components/SearchMenu/SearchBar';
import ContentsBox from '../../../components/ContentsBox';

function BookSearch() {
  const conditions = [
    '책 이름',
    'ISBN',
    '작가명',
    '출판사명',
    '시리즈명',
    '평점 구간',
    '특정 평점',
    '카테고리명',
  ];
  const [searchWord, setSearchWord] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [baseRate, setBaseRate] = useState(0);
  const [endRate, setEndRate] = useState(0);
  const navigate = useNavigate();

  function handleClick(index) {
    setSelectedIndex(index);
  }

  function searchBook(e) {
    e.preventDefault();

    navigate('/mypage', {
      state: {
        searchWord,
        selectedIndex,
        baseRate,
        endRate,
      },
    });
  }

  return (
    <ContentsBox width="1024px" height="250px" margin="15px 0">
      <LinedSpan>내가 읽은 책 검색</LinedSpan>
      <FormContainer onSubmit={searchBook}>
        <SearchBar
          width="500px"
          onChange={(e) => setSearchWord(e.target.value)}
          disabled={selectedIndex === 5 || selectedIndex === 6}
        />
        <ConditionContainer>
          <Head>검색 조건</Head>
          {conditions.map((item, index) => {
            return (
              <Condition key={`condition-${index}`}>
                <Item
                  onClick={() => {
                    handleClick(index);
                    console.log(index);
                  }}
                  $selectedIndex={selectedIndex}
                  $index={index}
                >
                  {item}
                </Item>
                <Divider>|</Divider>
              </Condition>
            );
          })}
        </ConditionContainer>
        {selectedIndex === 5 && (
          <div>
            <Head>평점 구간</Head>
            <input
              type="number"
              name="firstNumber"
              defaultValue={0}
              max="10"
              style={{
                border: '1px solid',
                width: '50px',
                marginLeft: '10px',
              }}
              onChange={(e) => setBaseRate(e.target.value)}
            />
            <span> ~ </span>
            <input
              type="number"
              name="secondtNumber"
              defaultValue={0}
              max="10"
              style={{ border: '1px solid', width: '50px' }}
              onChange={(e) => setEndRate(e.target.value)}
            />
            <span> (0부터 10 사이의 숫자를 입력해주세요)</span>
          </div>
        )}
        {selectedIndex === 6 && (
          <div>
            <Head>특정 평점</Head>
            <input
              type="number"
              name="rate"
              defaultValue={0}
              max="10"
              style={{ border: '1px solid', width: '50px', marginLeft: '10px' }}
              onChange={(e) => setBaseRate(e.target.value)}
            />
            <span> (0부터 10 사이의 숫자를 입력해주세요)</span>
          </div>
        )}
      </FormContainer>
    </ContentsBox>
  );
}

export default BookSearch;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
const ConditionContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const Head = styled.span`
  margin-left: 5px;
  margin-right: 10px;
  font-weight: bold;
`;

const Condition = styled.div`
  display: flex;
  gap: 10px;
`;

const Item = styled.li`
  color: ${({ $selectedIndex, $index }) =>
    $selectedIndex === $index ? `${palette.mainYellow}` : ''};
  cursor: pointer;
`;
const Divider = styled.span`
  color: #ccc;
`;
