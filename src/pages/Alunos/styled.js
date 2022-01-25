import styled from 'styled-components';

import * as colors from '../../config/colors';

import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 0 auto;
  text-align: center;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
    flex-wrap: wrap;
  }
  div + div {
    border-top: 2px solid #aaaa;
  }
  a {
    color: ${colors.primaryDarkColor};
    cursor: pointer;
  }
  .delete:hover,
  .warn:hover {
    color: red;
  }
  .edit:hover {
    color: ${colors.primaryColor};
  }
  .warn {
    color: orange;
    cursor: pointer;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .fotoUser {
    color: ${colors.hotColor};
  }
`;

export const NovoAluno = styled(Link)`
  display: flex;
  padding: 10px;
  align-items: center;
  margin: 5px 0;
  text-decoration: none;
  font-weight: bold;
  color: ${colors.primaryDarkColor};
  .plusCircle {
    margin-left: 5px;
    color: green;
  }
`;
