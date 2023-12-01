import styled from 'styled-components';
import palette from '../../../styles/palette';

export const MenuContainer = styled.div`
  color: ${palette.lightBlack};
  display: flex;
  gap: 36px;
  font-family: GmarketSansMedium;

  > div {
    cursor: pointer;
  }
`;
