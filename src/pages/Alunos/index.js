import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserAlt,
  FaEdit,
  FaWindowClose,
  FaUserCircle,
  FaExclamationTriangle,
  FaPlusCircle,
} from 'react-icons/fa';

import axios from '../../services/axios';

import { Container } from '../../styles/Globalstyles';
import { useEffect, useState } from 'react';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const iduser = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    async function getData() {
      setIsloading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsloading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const id = iduser;
    if (!id) {
      toast.error('Você precisa fazer Login');
      return;
    }
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
    toast.warn(`Quer mesmo deletar o aluno?`);
  };

  const handleDelete = async (e, id, index) => {
    try {
      setIsloading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsloading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsloading(false);
    }
  };

  const handleEdit = () => {
    const id = iduser;
    if (!id) {
      toast.error('Você precisa fazer Login');
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to="/aluno">
        Novo Aluno
        <FaPlusCircle className="plusCircle" />
      </NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle className="fotoUser" size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link onClick={handleEdit} to={`/aluno/${aluno.id}/edit`}>
              <FaEdit className="edit" size={18} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose className="delete" size={18} />
            </Link>

            <FaExclamationTriangle
              onClick={(e) => handleDelete(e, aluno.id, index)}
              className="warn"
              size={20}
              display="none"
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
