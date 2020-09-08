import * as actionTypes from '../actions/actionTypes';


const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: false
}

const reducer = (state= initialState, action) =>{
    switch (action.type){
        case actionTypes.LOGIN_START:
            return {...state,
                token: null,
                user: null,
                loading: true};
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {...state,
                token: action.payload.token,
                user: action.payload.user,
                loading: false};
        case actionTypes.USER_LOADING_START:
            return {...state,
                loading: true};
        case actionTypes.USER_LOADED_SUCCESS:
            return {...state,
                user: action.payload,
                loading: false};
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
            return {...state,
                token: null,
                user: null,
                loading: false};
        case actionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {...state,
                token: null,
                user: null,
                loading: false};
        default:
            return state;
    }
}

export default reducer;