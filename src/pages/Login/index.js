import React from 'react';

import { useDispatch } from 'react-redux'; //executa a ação do reducer

import { Container } from '../../styles/Globalstyles';
import { Title, Paragrafo } from './styled';

import * as exampleActions from '../../store/modules/example/actions'; // busca as ações do reducer

// import axios from '../../services/axios'; // Conexão com o servidor

export default function Login() {
  /*React.useEffect(() => {
    // servidor
    async function getData() {
      const response = await axios.get('/alunos');
      const { data } = response;
    }
    getData();
  }, []);*/

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title>
        Login
        <small> Oie!</small>
      </Title>
      <Paragrafo>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos sunt eius
        temporibus unde culpa corporis rem illum, amet animi explicabo officiis
        consequuntur quaerat non aut! Perferendis magnam autem in facere!
      </Paragrafo>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
