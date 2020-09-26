import axios from '../../axios';
import * as actionTypes from "./actionTypes";
import tokenConfig from "./auth";
import {createError} from "./messages";


export const loadPopularUsers = () => {
    return (dispatch, getState) => {
        axios.get('/api/activity/popularusers/', tokenConfig(getState))
            .then(res => {
               dispatch({
                   type: actionTypes.LOAD_INFO_POPULAR_USERS_SUCCESS,
                   payload: res.data
               });
            })
            .catch(error => {
                if(error.response){
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {popularUsers: 'Unable to load popular users'},
                            status: 500
                        }
                    });
                }
            });
    }
}

export const loadHashtagTrends = (shouldFetchUsers=false) => {
    return (dispatch, getState) => {
        if(shouldFetchUsers){
            dispatch({
                type: actionTypes.CLEAR_POSTS
            });
        }
        axios.get('/api/activity/hashtagtrends/', tokenConfig(getState))
            .then(res => {
               dispatch({
                   type: actionTypes.LOAD_HASHTAG_TRENDS_SUCCESS,
                   payload: res.data,
                   status: res.status
               });
               if(shouldFetchUsers){
                   const postsData = {results: []};
                   for(let hashtag of res.data.hashtags){
                       postsData.results.push(hashtag.most_popular);
                       axios.get(hashtag.most_popular.user.substring(22,), tokenConfig(getState))
                           .then(res => {
                               dispatch({
                                   type: actionTypes.SAVE_USERS_SUCCESS,
                                   payload: res.data
                               });
                           }).catch(error => {
                           dispatch(createError('userFail', 'Cannot load user'));
                       });
                   }
                   dispatch({
                       type: actionTypes.FETCH_USER_POSTS_SUCCESS,
                       payload: postsData,
                       status: 200
                   });
               }
            }).catch(error => {
                if(error.response){
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {hashtagTrends: 'Unable to load trends'},
                            status: 500
                        }
                    });
                }
        });
    }
}