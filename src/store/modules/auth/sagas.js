import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { get } from 'lodash';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

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

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;
  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('conta alterada com sucesso');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta Criada com Sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      toast.info('Você precisa fazer login novamente');
      yield put(actions.loginFailure());
      return history.push('/login');
    }
    if (errors.length > 0) {
      error.mat((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }
    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), //vai ouvir o Rehydrate no saga
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
