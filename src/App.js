import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store'; //Redux
import history from './services/history';
import Globalstyles from './styles/Globalstyles';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Header />
            <Routes />
            <Globalstyles />
            <ToastContainer autoClose={4000} />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
