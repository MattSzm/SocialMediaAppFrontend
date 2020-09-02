import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import axios from 'axios';
import postsReducer from './store/reducers/posts';
import authReducer from './store/reducers/auth';
import modalReducer from './store/reducers/modal';


const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    modal: modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
            <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
