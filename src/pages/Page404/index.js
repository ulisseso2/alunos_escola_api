import React from 'react';
import { Container } from '../../styles/Globalstyles';
import { toast } from 'react-toastify';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

export default function Page404() {
  toast.warning('Essa página não existe');

  return (
    <Container>
      <h1> Erro 404 </h1>
      <p>Página não encontrada!</p>
      <a className="voltar" href="/">
        <FaArrowAltCircleLeft /> voltar
      </a>
    </Container>
  );
}
