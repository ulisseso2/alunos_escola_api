import React from 'react';
import { useState } from 'react'; // seta o estado de um componente funcional
import { toast } from 'react-toastify'; // Exibe as msg na tela
import { isEmail } from 'validator'; // Valida o email
import { useDispatch, useSelector } from 'react-redux'; // controla as ações
import { get } from 'lodash'; // usa o redirect configurado em MyRoutes

import { Container } from '../../styles/Globalstyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions'; // onde estão minhas ações usadas pelo useDispatch
import Loading from '../../components/Loading';

import axios from '../../services/axios'; // minha conexão com o servidor

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('e-mail inválido');
    }

    if (password.length < 3) {
      formErrors = true;
      toast.error('senha inválida');
    }
    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login </h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail cadastrado"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit"> Entrar</button>
      </Form>
    </Container>
  );
}
