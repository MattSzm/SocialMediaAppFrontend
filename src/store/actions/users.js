import tokenConfig from "./auth";
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchRelatedUsers = (payload) => {
    return (dispatch, getState) => {
        const config = tokenConfig(getState);
        for(let post of payload.tweets){
            axios.get(post.user.substring(22, ), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {
            });
        }
        for(let post of payload.shares) {
            axios.get(post.account.substring(22,), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {
            });
            axios.get(post.tweet_itself.user.substring(22,), config)
                .then(res => {
                    dispatch({
                        type: actionTypes.SAVE_USERS,
                        payload: res.data});
                }).catch(error => {
            });
        }

    };
};