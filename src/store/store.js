import {createStore, applyMiddleware, combineReducers} from "redux";
import postsReducer from "./reducers/posts";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modal";
import errorsReducer from './reducers/errors';
import messagesReducer from './reducers/messages';
import usersReducer from './reducers/users';
import commentsReducer from './reducers/comments';
import infoReducer from './reducers/info';
import Thunk from "redux-thunk";


const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    modal: modalReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    users: usersReducer,
    comments: commentsReducer,
    info: infoReducer
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;