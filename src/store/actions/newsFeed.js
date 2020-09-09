import * as actionTypes from './actionTypes';
import axios from 'axios'
import tokenConfig from "./auth";


const fetchRelatedUsers = (payload) => {
    return (dispatch, getState) => {
        const config = tokenConfig(getState);
        for(let post of payload.tweets){
            axios.get(post.user.substring(22, ), config)
                .then(res => {
                post.user = res.data;
            }).catch(error => {
                dispatch({type: actionTypes.FETCH_NEWSFEED_FAIL});
            });
        }
        for(let post of payload.shares){
            axios.get(post.account.substring(22, ), config)
                .then(res => {
                    post.account = res.data;
                }).catch(error =>{
                dispatch({type: actionTypes.FETCH_NEWSFEED_FAIL});
            });
            axios.get(post.tweet_itself.user.substring(22, ), config)
                .then(res => {
                    post.tweet_itself.user = res.data;
                }).catch(error => {
                    dispatch({type: actionTypes.FETCH_NEWSFEED_FAIL});
                });
        }
        dispatch({type: actionTypes.FETCH_NEWSFEED_SUCCESS,
                    payload: payload});
    };
};


export const fetchNewsFeed = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_NEWSFEED_START});
        axios.get('/api/tweet/newsfeed/', tokenConfig(getState))
            .then(res => {
                dispatch(fetchRelatedUsers(res.data));
            }).catch(error => {
                console.log(error);
                dispatch({type: actionTypes.FETCH_NEWSFEED_FAIL});
            }
        );
    };
};