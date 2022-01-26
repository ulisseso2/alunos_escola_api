import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaCamera } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/Globalstyles';
import { Form, FotosEdit } from './styled';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match, history }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao carregar a imagem');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id, history]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData(); //Criar form que o post da API vai receber
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com Sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Foto do aluno </h1>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
        </label>
        <input type="file" id="foto" onChange={handleChange} />
      </Form>
    </Container>
  );
}

Fotos.propType = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
