import * as S from './HeaderMenuStyle';
import { Link } from 'react-router-dom';

function LeftMenu() {
  return (
    <S.MenuContainer>
      <Link to="/mylibrary">나의 서재</Link>
      <div>둘러보기</div>
    </S.MenuContainer>
  );
}

export default LeftMenu;
