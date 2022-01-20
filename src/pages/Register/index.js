import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { get } from 'lodash';

import { StyleSheetManager } from 'styled-components';

import { Container } from '../../styles/Globalstyles';
import { Form } from './styled';
import axios from '../../services/axios'; // Conexão com o servidor
import history from '../../services/history';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('nome deve ter entre 3 e 255 caractéres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('e-mail inválido');
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('senha deve ter entre 6 e 50 caractéres');
    }

    if (formErrors) return;
    try {
      await axios.post('/users/', {
        nome,
        password,
        email,
      });
      history.push('/login');
      toast.success('Parabéns! Usuário criado com sucesso!');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Criação de conta</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="defina uma senha"
          />
        </label>
        <button type="submit">Criar Conta</button>
      </Form>
    </Container>
  );
}
