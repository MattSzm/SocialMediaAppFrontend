import * as actionTypes from './actionTypes';
import axios from 'axios'
import tokenConfig from "./auth";
import {createMessage} from './messages';


export const createPost = (form) => {
    return (dispatch, setState) => {
        dispatch({type: actionTypes.CREATE_POST_START});
        const config = tokenConfig(setState);
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