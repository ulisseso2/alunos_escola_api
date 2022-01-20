import styled from 'styled-components';
import * as color from '../../config/colors';
export const Form = styled.form`
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: bold;
  }
  input {
    margin-top: 5px;
    height: 40px;
    font-size: 18px;
    padding: 3px;
    border: 1px solid #aaa;
    border-radius: 5px;
  }
  input::placeholder {
    color: #ccc;
    font-size: 15px;
  }
  input:focus {
    border: 2px solid ${color.primaryColor};
    filter: brightness(95%);
  }
`;
