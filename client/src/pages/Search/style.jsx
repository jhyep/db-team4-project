import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 30px;
`;

export const SearchWordSpan = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const SearchResultContainer = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 68px;
`;

export const InfoContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

export const Cover = styled.img`
  transition-duration: 0.2s;

  &:hover {
    transform: scale(1.05, 1.05);
    transition-duration: 0.3s;
  }
`;

export const Title = styled.p`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  width: 150px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Author = styled.p`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  margin-top: 5px;
  font-size: 14px;
`;
