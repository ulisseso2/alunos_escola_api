import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/Globalstyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('e-mail inválido');
    }

    if (password.length < 10) {
      formErrors = true;
      toast.error('senha inválida');
    }
    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password }));
  };

  return (
    <Container>
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
