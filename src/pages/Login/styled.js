import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
  }
  input {
    height: 20px;
    padding: 10px;
    font-size: 16px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #aaa;
  }
  input:focus {
    border: 2px solid ${colors.primaryColor};
  }
`;
