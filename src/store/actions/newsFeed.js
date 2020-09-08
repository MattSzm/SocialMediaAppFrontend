import * as actionTypes from './actionTypes';
import axios from 'axios'
import tokenConfig from "./auth";


export const fetchNewsFeed = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_NEWSFEED_START});
        axios.get('/api/tweet/newsfeed/', tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_NEWSFEED_SUCCESS,
                    payload: res.data
                });
            }).catch(error => {
                console.log(error);
                dispatch({type: actionTypes.FETCH_NEWSFEED_FAIL});
            }
        );
    };
};