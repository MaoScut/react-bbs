import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import App from './router';
import logger from './middleware/logger';
import checkAuth from './middleware/checkAuth';
// const App = () => (
//   <div>
//     hhh
//   </div>
// );

const store = createStore(rootReducer, applyMiddleware(checkAuth, thunkMiddleware, logger));
const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);

if (module.hot) {
  module.hot.accept();
}
