import styled from 'styled-components';
import { primaryColor, secundaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${secundaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 20px 0 0;
    font-weight: bold;
  }

  .userOnline {
    color: yellowgreen;
  }
`;
