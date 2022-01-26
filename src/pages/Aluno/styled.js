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

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.hotColor};
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }
`;
