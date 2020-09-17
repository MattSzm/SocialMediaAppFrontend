import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as modalActions from './modal';
import {createMessage} from './messages';
import {fetchUserPosts} from "./posts";


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


export const loadCurrentUser = (shouldFetchPosts=false) => {
    return (dispatch, getState) => {
    dispatch({type: actionTypes.USER_LOADING_START});

        axios.get('/api/user/currentuser/', tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.USER_LOADING_SUCCESS,
                    payload: res.data
                });
                if(shouldFetchPosts){
                    dispatch(fetchUserPosts(res.data.uuid))
                }
            }).catch(error => {
            dispatch({
                type: actionTypes.AUTH_ERROR
            })
        });
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
                dispatch(createMessage(
                    {loggedIn: 'Logged in successfully'}));
                dispatch(modalActions.modalToggle());
            }).catch(error => {
                if(error.response) {
                    dispatch({
                        type: actionTypes.LOGIN_FAIL
                    });
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: error.response.data,
                            status: error.response.status
                        }
                    });
                }
            })
    };
};

export const logout = () => {
    return (dispatch, getState) => {
        axios.post('/api/auth/logout/', null, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.CLEAR_POSTS
                });
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS,
                })
                dispatch(createMessage(
                    {loggedOut: 'Logged out successfully'}
                ));
            }).catch(error => {});
    };
};


export const register = (form) => {
    return dispatch => {
        dispatch({type: actionTypes.REGISTER_START});
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('/api/auth/register/', form, config)
            .then(res => {
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                    payload: res.data
                })
                dispatch(createMessage(
                    {registered: 'Account created successfully'}));
                dispatch(modalActions.modalToggle());
            }).catch(error => {
            if(error.response) {
                dispatch({
                    type: actionTypes.REGISTER_FAIL
                });
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: error.response.data,
                        status: error.response.status
                    }
                });
            }
        })
    };
};


export const userEdit = (form) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.USER_EDIT_START});
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = {
            'Content-Type': 'multipart/form-data'
        };
        axios.patch('/api/user/currentuser/', form, config)
            .then(res => {
                dispatch({
                    type: actionTypes.USER_EDIT_SUCCESS,
                    payload: res.data
                });
                dispatch(createMessage(
                    {profileUpdated: 'Account updated successfully'}));
            }).catch(error => {
                dispatch({
                    type: actionTypes.USER_EDIT_FAIL
                });
                if(error.response) {
                    console.log(error.response);
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {userEdit: 'Unable to change'},
                            status: error.response.status
                        }
                    });
                }
        });
    };
};

