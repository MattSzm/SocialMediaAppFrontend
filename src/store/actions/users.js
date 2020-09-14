import axios from "axios";
import * as actionTypes from "./actionTypes";


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const fetchRelatedUsers = (payload) => {
    return (dispatch) => {
        for(let post of payload.tweets){
            axios.get(post.user.substring(22, ), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {});
        }
        for(let post of payload.shares) {
            axios.get(post.account.substring(22,), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {});
            axios.get(post.tweet_itself.user.substring(22,), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {});
        }

    };
};

export const fetchUser = (username) => {
    return (dispatch) => {
        axios.get(`/api/user/username/${username}/`, config)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: actionTypes.FETCH_USER_SUCCESS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: actionTypes.FETCH_USER_FAIL,
                    payload: err.response.data
                });
            });
    };
};