import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux';
import { AppContainer } from 'react-hot-loader';
import Stage from './components/stage';
import './styles/scaffolds.scss';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Stage);

if (module.hot) {
  module.hot.accept('./components/stage', () => { render(Stage); });
}
