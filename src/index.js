import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import './index.scss';
import reducers from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducers, applyMiddleware(thunk, logger));


render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>

), document.getElementById('root'));


registerServiceWorker();
