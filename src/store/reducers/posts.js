import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    shares: [],
    newsFeedPostsTimeStamp: null,
    newsFeedSharesTimeStamp: null,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_NEWSFEED_START:
            return {...state, loading: true};
        case actionTypes.FETCH_NEWSFEED_SUCCESS:
            return {...state,
                posts: action.payload.tweets,
                shares: action.payload.shares,
                newsFeedPostsTimeStamp: action.payload.oldest_tweet_date,
                newsFeedSharesTimeStamp: action.payload.oldest_share_tweet,
                loading: false};
        case actionTypes.FETCH_NEWSFEED_FAIL:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default reducer;