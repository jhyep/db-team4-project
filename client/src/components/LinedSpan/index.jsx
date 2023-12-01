import styled from 'styled-components';
import palette from '../../styles/palette';

function LinedSpan({ children }) {
  return <Line>{children}</Line>;
}

export default LinedSpan;

const Line = styled.span`
  font-size: 22px;
  font-family: GmarketSansMedium;

  /* thick underline */
  box-shadow: inset 0 -14px ${palette.highlight};
`;
