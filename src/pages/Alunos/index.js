import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserAlt, FaEdit, FaWindowClose } from 'react-icons/fa';

import axios from '../../services/axios';

import { Container } from '../../styles/Globalstyles';
import { useEffect, useState } from 'react';
import { AlunoContainer, ProfilePicture } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url1} alt="" />
              ) : (
                <FaUserAlt className="fotoUser" size={36} />
              )}

              <FaUserAlt className="fotoUser" size={30} />
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
