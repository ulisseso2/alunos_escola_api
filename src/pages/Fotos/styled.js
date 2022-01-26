import styled from 'styled-components';
import * as colors from '../../config/colors';

export const FotosEdit = styled.div`
  display: flex;
`;
export const Form = styled.form`
  label {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    border: 5px dotted ${colors.hotColor};
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }
  img {
    width: 150px;
    height: 150px;
  }
  input {
    display: none;
  }
`;
