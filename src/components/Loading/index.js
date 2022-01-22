import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span> Carregando...</span>
    </Container>
  );
}

Loading.defaultPropos = {
  isLoading: false,
};

Loading.protoTypes = {
  isLoading: PropTypes.bool,
};
