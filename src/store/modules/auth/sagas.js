import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload); //manda para api os dados do usuário para gerar o token
    yield put(actions.loginSuccess({ ...response.data })); //chama a action que está do meu reducer informando o sucesso
    toast.success('Você fez login'); // mostra mensagem de sucesso na tela

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`; // coloca do token do Cabeçalho da API

    history.push(payload.prevPath); // Redirect user from last page.
  } catch (e) {
    toast.error('usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), //vai ouvir o Rehydrate no saga
]);
