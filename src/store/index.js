import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';
import createSagaMiddlewere from 'redux-saga';

import persistedReducers from './modules/reudxPersist';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddlewere = createSagaMiddlewere();

const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddlewere)
);

sagaMiddlewere.run(rootSaga);

export const persistor = persistStore(store);
export default store;
