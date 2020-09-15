import axios from '../../axios';
import * as actionTypes from "./actionTypes";
import tokenConfig from "./auth";
import {createError} from "./messages";
import {fetchUserPosts} from "./posts";


export const fetchRelatedUsersNewsFeed = (payload) => {
    return (dispatch, getState) => {
        for(let post of payload.tweets){
            axios.get(post.user.substring(22, ), tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS_SUCCESS,
                        payload: res.data});
                }).catch(error => {
                dispatch(createError('userFail', 'Cannot load user'));
            });
        }
        for(let post of payload.shares) {
            axios.get(post.account.substring(22,), tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS_SUCCESS,
                        payload: res.data});
                }).catch(error => {
                dispatch(createError('userFail', 'Cannot load user'));
            });
            axios.get(post.tweet_itself.user.substring(22,), tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS_SUCCESS,
                        payload: res.data});
                }).catch(error => {
                    dispatch(createError('userFail', 'Cannot load user'));
            });
        }
    };
};


export const fetchRelatedUsersUserPage = (payload, userUuid) => {
    return (dispatch, getState) =>{
        for(let post of payload){
            if(userUuid !== post.user.substring(36, post.user.length-1)) {
                axios.get(post.user.substring(22,), tokenConfig(getState))
                    .then(res => {
                        dispatch({
                            type: actionTypes.SAVE_USERS_SUCCESS,
                            payload: res.data
                        });
                    }).catch(error => {
                        dispatch(createError('userFail', 'Cannot load user'));
                });
            }
        }
    }
}

export const fetchUser = (username, loadPosts=false) => {
    return (dispatch, getState) => {
        if(loadPosts){
            dispatch({type: actionTypes.CLEAR_USERS});
        }
        axios.get(`/api/user/username/${username}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_USER_SUCCESS,
                    payload: res.data
                });
                if(loadPosts){
                    dispatch(fetchUserPosts(res.data.uuid));
                }
            }).catch(err => {
                dispatch({
                    type: actionTypes.FETCH_USER_FAIL,
                    payload: err.response.data
                });
                dispatch(createError('noUser', 'Cannot find user'));
            });
    };
};
