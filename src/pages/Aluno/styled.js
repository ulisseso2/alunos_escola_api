import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  background-color: ${colors.primaryColor};
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  align-items: center;
  input {
    display: block;
    width: 75%;
    height: 20px;
    padding: 10px;
    font-size: 16px;
    margin: 5px auto;
    border-radius: 5px;
    border: 1px solid #aaa;
  }
  input:focus {
    border: 2px solid ${colors.primaryColor};
  }
`;
