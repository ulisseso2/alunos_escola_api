import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import { Container } from '../../styles/Globalstyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Aluno({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caractéres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('O sobrenome deve ter entre 3 e 255 caractéres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('e-mail inválido');
    }
    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('idade precisa ser um número inteiro');
    }
    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error(
        'O peso precisa ser um número inteiro ou separado por . (ponto)'
      );
    }
    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error(
        'A altura precisa ser um número inteiro ou separado por . (ponto)'
      );
    }

    if (formErrors) return;
    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
        history.push('/');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
      if (status === 401) dispapath(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{!id ? 'Cadastrar Aluno' : 'Editar Aluno'}</h1>
      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={150} />}
          <Link to={`/fotos/${id}`}>
            <FaCamera size={15} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <h4>Aluno {!id ? '' : id}</h4>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="text"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />
        <button type="submit">{!id ? 'Criar' : 'Atualizar'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
