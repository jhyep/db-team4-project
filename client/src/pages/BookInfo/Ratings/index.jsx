import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useInputCount } from '../../../hooks/useInputCount';
import axios from 'axios';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import Button from '../../../components/Button';

function Ratings(props) {
  const params = useParams();
  const [bkRate, setBkRate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const { inputCount, handleInput } = useInputCount();
  const [myRate, setMyRate] = useState(0);
  const [myContent, setMyContent] = useState('');

  useEffect(() => {
    getBookInfo(params.book_id);
  }, [params.book_id]);

  async function getBookInfo(bookId) {
    try {
      let response;
      response = await axios.post('/book/getrate', {
        itemId: bookId,
      });
      setBkRate(response.data);

      if (sessionStorage.getItem('userid')) {
        setIsLogined(true);

        response = await axios.post('/book/getmyrate', {
          isbn13: bookId,
          userId: sessionStorage.getItem('userid'),
        });

        if (response.data != null) {
          setMyRate(response.data.rating);
          setMyContent(response.data.contents);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log('failed to get ratings', err);
    }
  }

  async function submitRating(e) {
    e.preventDefault();
    if (myContent.length === 0) {
      alert('한 글자 이상 입력해주세요.');
    } else {
      try {
        let response;
        response = await axios.post('/book/addrate', {
          rating: myRate,
          contents: myContent,
          user_id: sessionStorage.getItem('userid'),
          isbn13: params.book_id,
        });

        if (response.data == 'insert') {
          alert('한줄평이 등록되었습니다.');
        } else if (response.data == 'update') {
          alert('한줄평을 수정하였습니다.');
        }
        window.location.reload();
      } catch (err) {
        console.log('failed to add rating', err);
      }
    }
  }

  function handleOnchange(e) {
    handleInput(e);
    setMyContent(e.target.value);
  }

  return (
    <Container>
      {isLoading ? (
        <p>로딩 중입니다.</p>
      ) : (
        <>
          <Title>한줄평 작성</Title>
          {isLogined ? (
            <form>
              {props.isRead ? (
                <>
                  <InputContainer>
                    <div>
                      <span>평점: </span>
                      <input
                        type="number"
                        name="rate"
                        min="0"
                        max="10"
                        step="1"
                        value={myRate === 0 ? 0 : myRate}
                        onChange={(e) => {
                          setMyRate(e.target.value);
                        }}
                        style={{ border: '1px solid', width: '40px' }}
                      />
                    </div>
                    <EditorWrapper>
                      <EditorContainer>
                        <Editor
                          placeholder="200자 이내의 간단한 리뷰를 남겨보세요."
                          maxLength="200"
                          value={myContent}
                          onChange={(e) => {
                            handleOnchange(e);
                          }}
                        ></Editor>
                        <p style={{ textAlign: 'right' }}>{inputCount}/200</p>
                      </EditorContainer>
                      <Button
                        type="submit"
                        height="100px"
                        onClick={submitRating}
                      >
                        등록
                      </Button>
                    </EditorWrapper>
                  </InputContainer>
                </>
              ) : (
                <InputContainer>
                  <h4>내 서재에 추가 후 작성을 진행해 주세요.</h4>
                </InputContainer>
              )}
            </form>
          ) : (
            <InputContainer>
              <h4>한줄평을 작성하시려면 로그인해 주세요.</h4>
            </InputContainer>
          )}
          <Title>다른 사용자들의 한줄평</Title>
          <RatingsContainer>
            {bkRate.map((item, index) => {
              return (
                <Box key={`search-result-${index}`}>
                  <p>
                    <Head>ID</Head> <Divider>|</Divider> {item.userId}
                  </p>
                  <p>
                    <Head>평점</Head> <Divider>|</Divider> {item.rating}
                  </p>
                  <p>
                    <Head>내용</Head> <Divider>|</Divider> {item.comment}
                  </p>
                </Box>
              );
            })}
          </RatingsContainer>
        </>
      )}
    </Container>
  );
}

export default Ratings;

const Container = styled.div`
  margin-top: 30px;
`;

const Title = styled.span`
  color: black;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: GmarketSansMedium;
  font-weight: bold;

  /* thick underline */
  box-shadow: inset 0 -8px ${palette.highlight};
`;

const RatingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
`;

const Box = styled.div`
  background-color: #f6f6f6;
  box-sizing: border-box;
  width: 450px;
  height: 200px;
  padding: 20px;

  > p {
    margin: 0 0 5px 0;
  }
`;

const Head = styled.span`
  font-weight: bold;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 20px 0;
`;

const EditorWrapper = styled.div`
  display: flex;

  > button {
    margin-top: 12px;
    margin-left: 20px;
  }
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
`;

const Editor = styled.textarea`
  resize: none;
  width: 700px;
  height: 100px;
  margin-top: 10px;
`;

const Divider = styled.span`
  color: #ccc;
`;
