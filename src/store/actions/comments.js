import axios from '../../axios';
import * as actionTypes from "./actionTypes";
import tokenConfig from "./auth";
import {createError, createMessage} from "./messages";
import {fetchRelatedUsersComments} from "./users";


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
             dispatch(fetchComments(postUuid));
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

export const fetchComments = (postUuid) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_COMMENTS_START});
        axios.get(`/api/tweet/comments/${postUuid}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_COMMENTS_SUCCESS,
                    payload: res.data,
                    status: res.status
                });
                dispatch(fetchRelatedUsersComments(
                    res.data.results
                ));
            }).catch(error => {
                dispatch({type: actionTypes.FETCH_COMMENTS_FAIL});
                if(error.response){
                    dispatch({
                       type: actionTypes.GET_ERRORS,
                       payload: {
                           msg: {postComments: 'Unable to load comments'},
                           status: error.response.status
                       }
                    });
                }
        });
    };
};

export const fetchMoreComments = (link) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.LOAD_MORE_COMMENTS_START});
        axios.get(link.substring(22,), tokenConfig(getState))
            .then(res => {
                dispatch({
                   type: actionTypes.LOAD_MORE_COMMENTS_SUCCESS,
                   payload: res.data
                });
                dispatch(fetchRelatedUsersComments(
                    res.data.results
                ));
            }).catch(error => {
            dispatch({type: actionTypes.FETCH_COMMENTS_FAIL});
            if(error.response){
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {postComments: 'Unable to load comments'},
                        status: error.response.status
                    }
                });
            }
        });
    }
}


export const createComment = (form, postUuid) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.CREATE_COMMENT_START});
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = {
            'Content-Type': 'multipart/form-data'
        };

        axios.post(`/api/tweet/comments/${postUuid}/`, form, config)
            .then(res => {
                dispatch({
                    type: actionTypes.CREATE_COMMENT_SUCCESS,
                    payload: res.data
                });
                dispatch(createMessage(
                    {createdComment: 'Created comment successfully'}
                ));
            }).catch(error => {
            dispatch({
                type: actionTypes.CREATE_COMMENT_FAIL,
            });
            if(error.response) {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {createCommentFail: 'Unable to create comment'},
                        status: error.response.status
                    }
                });
            }
        });
    };
};


export const deleteComment = (tweetUuid, commentId) => {
    return (dispatch, getState) => {
        axios.delete(`/api/tweet/destroycomment/${tweetUuid}/${commentId}/`,
                tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_COMMENT,
                    payload: commentId
                });
                dispatch(createMessage(
                    {commentDeleted: 'Deleted comment successfully'}));
            }).catch(error => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: {
                    msg: {deleteComment: 'Unable to delete comment'},
                    status: 500
                }
            });
        });
    };
};