import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistReducers = persistReducer(
    {
      key: 'NOME-DA-APLICACAO',
      storage,
      whitelist: ['example'], //O único módulo que quero salvar nome da rootReducer
    },
    reducers
  );
  return persistReducers;
};
