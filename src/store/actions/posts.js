import * as actionTypes from './actionTypes';
import axios from 'axios'
import tokenConfig from "./auth";
import {createMessage} from './messages';


export const createPost = (form) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.CREATE_POST_START});
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = {
            'Content-Type': 'multipart/form-data'
        };

        axios.post('/api/tweet/create/', form, config)
            .then(res => {
                dispatch({
                    type: actionTypes.CREATE_POST_SUCCESS,
                    payload: res.data
                });
                dispatch(createMessage(
                    {createdPost: 'Created tweet successfully'}
                ));
            }).catch(error => {
                dispatch({
                    type: actionTypes.CREATE_POST_FAIL,
                });
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: { createPost: 'Unable to create post'},
                        status: 500
                    }
            });
        });
    };
};


export const fetchUserPosts = (userUuid) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_USER_POSTS_START});

        axios.get(`/api/tweet/byuser/${userUuid}/`, tokenConfig(getState))
            .then(res => {
                console.log(res.data);
            });
    }
}