import styled, { createGlobalStyle } from 'styled-components';

import * as colors from '../config/colors';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
  }

  body {
    background-color: ${colors.primaryDarkColor};
    font-family: sans-serif;
    color: ${colors.primaryDarkColor}
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: ${colors.hotColor};
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    padding: 10px 20px;
    transition: all 300ms;
  }
  button:hover {
    filter: brightness(75%)
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  body .Toastify {
    background-color: ${colors.primaryColor};
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--success {

  }
`;

export const Container = styled.section`
  max-width: 500px;
  background-color: white;
  margin: 30px auto;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .voltar {
    display: flex;
    color: ${colors.primaryDarkColor};
    justify-content: space-between;
    margin: 5px auto;
    padding: 5px;
    width: 60px;
  }
`;
