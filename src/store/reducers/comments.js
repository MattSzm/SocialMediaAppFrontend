import * as actionTypes from '../actions/actionTypes';


const initialState = {
    pickedPost: null,
    userOfPickedPost: null,
    comments: [],
    linkToLoadMoreComments: null,
    loading: false,
    hasMore: true,
    loadingCreateComment: false
}

const reducer = (state= initialState, action) => {
    let hasMore = true;
    switch (action.type){
        case actionTypes.CLEAR_WHOLE_COMMENTS_REDUCER:
            return {...state,
                    pickedPost: null,
                    userOfPickedPost: null,
                    comments: []};
        case actionTypes.FETCH_POST_DETAIL_SUCCESS:
            return {...state,
                    pickedPost: action.payload};
        case actionTypes.FETCH_USER_IN_POST_DETAIL_SUCCESS:
            return {...state,
                userOfPickedPost: action.payload};
        case actionTypes.FETCH_POST_DETAIL_FAIL:
        case actionTypes.FETCH_USER_IN_POST_DETAIL_FAIL:
            return {...state,
                    pickedPost: null,
                    userOfPickedPost: null,
                    comments: []};
        case actionTypes.CREATE_LIKE_POST_DETAIL:
            const newPostWithLike = {...state.pickedPost};
            newPostWithLike.liked_by_current_user = true;
            newPostWithLike.number_likes += 1;
            return {...state,
                    pickedPost: newPostWithLike};
        case actionTypes.DELETE_LIKE_POST_DETAIL:
            const newPostWithoutLike = {...state.pickedPost};
            newPostWithoutLike.liked_by_current_user = false;
            newPostWithoutLike.number_likes -= 1;
            return {...state,
                    pickedPost: newPostWithoutLike};
        case actionTypes.CREATE_SHARE_POST_DETAIL:
            const newPostWithShare = {...state.pickedPost};
            newPostWithShare.shared_by_current_user = true;
            newPostWithShare.number_shares += 1;
            return {...state,
                    pickedPost: newPostWithShare};
        case actionTypes.DELETE_SHARE_POST_DETAIL:
            const newPostWithoutShare = {...state.pickedPost};
            newPostWithoutShare.shared_by_current_user = false;
            newPostWithoutShare.shared_by_current_user -= 1;
            return {...state,
                    pickedPost: newPostWithoutShare};
        case actionTypes.FETCH_COMMENTS_START:
            return {...state,
                comments: [],
                linkToLoadMoreComments: null,
                loading: true,
                hasMore: true};
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            if(action.status === 204){
                return {...state,
                    comments: [],
                    linkToLoadMoreComments: null,
                    loading: false,
                    hasMore: false};
            }
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                    comments: action.payload.results,
                    linkToLoadMoreComments: action.payload.next,
                    loading: false,
                    hasMore: hasMore};
        case actionTypes.FETCH_COMMENTS_FAIL:
            return {...state, loading: false};
        case actionTypes.LOAD_MORE_COMMENTS_START:
            return {...state,
                    loading: true,
                    hasMore: true};
        case actionTypes.LOAD_MORE_COMMENTS_SUCCESS:
            const newComments = [...state.comments].concat(action.payload.results);
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                comments: newComments,
                linkToLoadMoreComments: action.payload.next,
                loading: false,
                hasMore: hasMore};
        case actionTypes.CREATE_COMMENT_START:
            return {...state,
                loadingCreateComment: true};
        case actionTypes.CREATE_COMMENT_SUCCESS:
            let newCommentsWithCreated = [...state.comments];
            newCommentsWithCreated.unshift(action.payload);
            return {...state,
                comments: newCommentsWithCreated,
                loadingCreateComment: false};
        case actionTypes.CREATE_COMMENT_FAIL:
            return {...state,
            loadingCreateComment: false};
        case actionTypes.DELETE_COMMENT:
            const newCommentsWithoutDeleted = state.comments.filter(
                (comment) => {
                    return comment.id !== action.payload;
                });
            return {...state,
                comments: newCommentsWithoutDeleted};
        default:
            return state;
    }
}

export default reducer;