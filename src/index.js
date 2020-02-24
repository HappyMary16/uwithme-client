import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../src/locales/i18n';
import App from './App';
import createAppStore, { history } from './store/Store';
import { ConnectedRouter } from 'connected-react-router';

const store = createAppStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
