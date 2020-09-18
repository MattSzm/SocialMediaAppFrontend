import axios from '../../axios';
import * as actionTypes from "./actionTypes";
import tokenConfig from "./auth";
import {createError} from "./messages";


export const clearCommentsReducer = () => ({
   type: actionTypes.CLEAR_WHOLE_COMMENTS_REDUCER
});


export const fetchTweetWithComments = (postUuid) => {
   return (dispatch, getState) => {
      axios.get(`/api/tweet/${postUuid}/`, tokenConfig(getState))
          .then(res => {
             dispatch({
                type: actionTypes.FETCH_POST_DETAIL_SUCCESS,
                 payload: res.data
             });
             axios.get(res.data.user.substring(22,), tokenConfig(getState))
                 .then(res => {
                    dispatch({
                        type: actionTypes.FETCH_USER_IN_POST_DETAIL_SUCCESS,
                        payload: res.data
                    });
                 }).catch(err => {
                    if(err.response){
                        dispatch({
                            type: actionTypes.FETCH_USER_IN_POST_DETAIL_FAIL,
                            payload: err.response.data
                        });
                    }
                 dispatch(createError('noTweet', 'Cannot find tweet'));
             });
          }).catch(err => {
              if(err.response){
                  dispatch({
                      type: actionTypes.FETCH_POST_DETAIL_FAIL,
                      payload: err.response.data
                  });
              }
              dispatch(createError('noTweet', 'Cannot find tweet'));
      });
   };
};