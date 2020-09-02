import {createStore, applyMiddleware, combineReducers} from "redux";
import postsReducer from "./reducers/posts";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modal";
import Thunk from "redux-thunk";


const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    modal: modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;