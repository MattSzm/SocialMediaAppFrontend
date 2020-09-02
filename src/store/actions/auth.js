import * as actionTypes from './actionTypes';
import axios from 'axios'
import * as modalActions from './modal';


const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}
export default tokenConfig;

export const loadUser = () => {
    return (dispatch, getState) => {
    dispatch({type: actionTypes.USER_LOADING});
    console.log(getState().auth.token);
    axios.get('/api/user/currentuser/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data
            })
        }).catch(error => {
            console.log(error);
        dispatch({
            type: actionTypes.AUTH_ERROR
        })
    })
};};

export const login = (username, password) => {
    return dispatch => {
        dispatch({type: actionTypes.LOGIN_START});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            username, password
        });

        axios.post('/api/auth/login/', body, config)
            .then(res => {
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: res.data
                })
                dispatch(modalActions.modalToggle());
            }).catch(error => {
                dispatch({
                    type: actionTypes.LOGIN_FAIL
                })
            })
    };
};