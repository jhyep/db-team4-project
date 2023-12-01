import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  display: flex;
  width: 650px;
  margin: auto;
  margin-top: 70px;
  padding: 30px;
`;

export const LeftContainer = styled.div`
  width: 300px;
  padding-right: 30px;
  border-right: solid 1px #eee;
`;

export const Title = styled.div`
  color: #555;
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  border-bottom: solid 1px #eee;

  > h2 {
    font-weight: normal;
    margin-bottom: 20px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

export const InputBox = styled.input`
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-left: 12px;
  font-size: 14px;
`;

export const RightContainer = styled.div`
  color: #555555;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  font-size: 14px;

  > p > a {
    color: #0076c0;
    margin-left: 15px;
  }
`;

export const DeleteAlert = styled.p`
  color: #ff6666;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
