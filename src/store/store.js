import {createStore, applyMiddleware, combineReducers} from "redux";
import newsFeedReducer from "./reducers/newsFeed";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modal";
import errorsReducer from './reducers/errors';
import messagesReducer from './reducers/messages';
import usersReducer from './reducers/users';
import Thunk from "redux-thunk";


const rootReducer = combineReducers({
    newsFeed: newsFeedReducer,
    auth: authReducer,
    modal: modalReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;