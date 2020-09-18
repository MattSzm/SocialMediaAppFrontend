import * as actionTypes from '../actions/actionTypes';


const initialState = {
    pickedPost: null,
    userOfPickedPost: null,
    comments: [],
}

const reducer = (state= initialState, action) => {
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
        default:
            return state;
    }
}

export default reducer;