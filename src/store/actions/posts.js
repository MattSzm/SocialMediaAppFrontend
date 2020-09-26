import * as actionTypes from './actionTypes';
import axios from '../../axios';
import tokenConfig from "./auth";
import {createMessage} from './messages';
import {fetchRelatedUsersUserPage} from './users';


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
                    payload: res.data,
                });
                dispatch(fetchRelatedUsersUserPage(
                    [res.data]
                ));
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
                        msg: {createPost: 'Unable to create tweet'},
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
                dispatch({
                    type: actionTypes.FETCH_USER_POSTS_SUCCESS,
                    payload: res.data,
                    status: res.status
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results,
                    userUuid));
            }).catch(error => {
                dispatch({type: actionTypes.FETCH_USER_POSTS_FAIL});
                if(error.response) {
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {userPosts: 'Unable to load tweets'},
                            status: error.response.status
                        }
                    });
            }
        });
    };
};


export const fetchMoreUserPosts = (link, userUuid) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.LOAD_MORE_USER_POSTS_START});
        axios.get(link.substring(22, ), tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.LOAD_MORE_USER_POSTS_SUCCESS,
                    payload: res.data
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results,
                    userUuid));
            }).catch(error => {
                dispatch({type: actionTypes.FETCH_USER_POSTS_FAIL});
            if(error.response) {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {newsfeed: 'Unable to load newsfeed'},
                        status: error.response.status
                    }
                });
            }
        });
    };
};


export const deletePost = (postUuid) => {
    return (dispatch, getState) => {
        axios.delete(`/api/tweet/destroy/${postUuid}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_POST,
                    payloadUuid: postUuid
                });
                dispatch(createMessage(
                    {postDeleted: 'Deleted tweet successfully'}));
            }).catch(error => {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {deletePost: 'Unable to delete tweet'},
                        status: 500
                    }
                });
        });
    };
};


export const createLikePost = (postUuid, detail=false) => {
    return (dispatch, getState) => {
        axios.post(`/api/tweet/likes/${postUuid}/`,{}, tokenConfig(getState))
            .then((res) => {
                if(detail){
                    dispatch({
                        type: actionTypes.CREATE_LIKE_POST_DETAIL,
                    });
                }
                else {
                    dispatch({
                        type: actionTypes.CREATE_LIKE_POST,
                        payloadUuid: postUuid
                    });
                }
            }).catch(error => {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {likePost: 'Unable to like tweet'},
                        status: 500
                    }
                });
        });
    };
};

export const deleteLikePost = (postUuid, detail=false) => {
    return (dispatch, getState) => {
        axios.delete(`/api/tweet/likes/${postUuid}/`, tokenConfig(getState))
            .then(res => {
                if(detail){
                    dispatch({
                        type: actionTypes.DELETE_LIKE_POST_DETAIL,
                    });
                }
                else {
                    dispatch({
                        type: actionTypes.DELETE_LIKE_POST,
                        payloadUuid: postUuid
                    });
                }
            }).catch(error => {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {likePost: 'Unable to unlike tweet'},
                        status: 500
                    }
                });
        });
    };
};


export const createSharePost = (postUuid, detail=false) => {
    return (dispatch, getState) => {
        axios.post(`/api/tweet/share/${postUuid}/`, {}, tokenConfig(getState))
            .then(res => {
                if(detail){
                    dispatch({
                        type: actionTypes.CREATE_SHARE_POST_DETAIL
                    });
                }
                else{
                    dispatch({
                        type: actionTypes.CREATE_SHARE_POST,
                        payload: res.data,
                        payloadUuid: postUuid
                    });
                }
            }).catch(error => {
                if(error.response){
                    if(error.response.status===406){
                        dispatch({
                            type: actionTypes.GET_ERRORS,
                            payload: {
                                msg: {sharePost406: 'Cannot share own tweet'},
                                status: error.response.status
                            }
                        });
                    }
                    else if (error.response.status===409){
                        dispatch({
                            type: actionTypes.GET_ERRORS,
                            payload: {
                                msg: {sharePost409: 'Already shared this tweet'},
                                status: error.response.status
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: actionTypes.GET_ERRORS,
                            payload: {
                                msg: {sharePost: 'Unable to share tweet'},
                                status: 500
                            }
                        });
                    }
                }
        });
    };
};

export const deleteSharePost = (postUuid, detail=false, explore=false) => {
    return (dispatch, getState) => {
        axios.delete(`/api/tweet/share/${postUuid}/`, tokenConfig(getState))
            .then(res =>{
                if(detail){
                    dispatch({
                        type: actionTypes.DELETE_SHARE_POST_DETAIL
                    });
                }
                else {
                    dispatch({
                        type: actionTypes.DELETE_SHARE_POST,
                        payloadPostUuid: postUuid,
                        payloadUserUuid: getState().auth.user.uuid,
                        explore: explore
                    });
                }
            }).catch((error) => {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {sharePost: 'Unable to delete'},
                        status: 500
                    }
                });

        });
    };
};


export const fetchPostsWithHashtag = (hashtagValue) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_POSTS_WITH_HASHTAG_START});
        axios.get(`/api/tweet/withhashtag/${hashtagValue}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_POSTS_WITH_HASHTAG_SUCCESS,
                    payload: res.data,
                    status: res.status
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results, ''));
            }).catch(error => {
                    dispatch({type: actionTypes.FETCH_POSTS_WITH_HASHTAG_FAIL});
                    if (error.response) {
                        if(error.response.data.detail === 'Not found.'){
                            dispatch({
                                type: actionTypes.FETCH_POSTS_WITH_HASHTAG_SUCCESS,
                                status: 204
                            });
                        }
                        else {
                            dispatch({
                                type: actionTypes.GET_ERRORS,
                                payload: {
                                    msg: {userPosts: 'Unable to load tweets'},
                                    status: error.response.status
                                }
                            });
                        }
                }
        });
    }
}

export const fetchMorePostsWithHashtag = (link) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_MORE_POSTS_WITH_HASHTAG_START});
        axios.get(link.substring(22, ), tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_MORE_POSTS_WITH_HASHTAG_SUCCESS,
                    payload: res.data,
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results, ''));
            }).catch(error => {
                dispatch({type: actionTypes.FETCH_POSTS_WITH_HASHTAG_FAIL});
                if (error.response) {
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {userPosts: 'Unable to load tweets'},
                            status: error.response.status
                        }
                    });
                }

        });
    }
}


export const searchPostsWithPhrase = (phrase) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.SEARCH_POSTS_WITH_PHRASE_START});
        axios.get(`/api/tweet/search/${phrase}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.SEARCH_POSTS_WITH_PHRASE_SUCCESS,
                    payload: res.data,
                    status: res.status
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results, ''));
            }).catch(error => {
                dispatch({type: actionTypes.SEARCH_POSTS_WITH_PHRASE_FAIL});
                if (error.response) {
                    if(error.response.data.detail === 'Not found.'){
                        dispatch({
                            type: actionTypes.SEARCH_POSTS_WITH_PHRASE_SUCCESS,
                            status: 204
                        });
                    }
                    else {
                        dispatch({
                            type: actionTypes.GET_ERRORS,
                            payload: {
                                msg: {userPosts: 'Unable to load tweets'},
                                status: error.response.status
                            }
                        });
                    }
            }
        });
    }
}

export const searchMorePostsWithPhrase = (link) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.SEARCH_MORE_POSTS_WITH_PHRASE_START});
        axios.get(link.substring(22, ), tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.SEARCH_MORE_POSTS_WITH_PHRASE_SUCCESS,
                    payload: res.data,
                });
                dispatch(fetchRelatedUsersUserPage(
                    res.data.results, ''));
            }).catch(error => {
            dispatch({type: actionTypes.SEARCH_POSTS_WITH_PHRASE_FAIL});
            if (error.response) {
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: {
                        msg: {userPosts: 'Unable to load tweets'},
                        status: error.response.status
                    }
                });
            }

        });
    }
}