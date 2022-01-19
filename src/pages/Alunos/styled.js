import styled from 'styled-components';

import * as colors from '../../config/colors';

export const AlunoContainer = styled.div`
  margin-top: 10px;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #eee;
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
