import * as actionTypes from './actionTypes';
import axios from 'axios'


export const login = (username, password) => {
    return dispatch => {
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
            }).catch(error => {
            dispatch({
                type: actionTypes.LOGIN_FAIL
            })
        })
    };
};