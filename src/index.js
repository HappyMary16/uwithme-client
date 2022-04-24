import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../src/locales/i18n';
import App from './App';
import createAppStore, { history } from './store/Store';
import { ReduxRouter } from '@lagunovsky/redux-react-router';

const store = createAppStore();

render(
  <Provider store={store}>
    <ReduxRouter
      history={history}
      store={store}
      children={<App/>}
    />
  </Provider>,
  document.getElementById('root')
);
