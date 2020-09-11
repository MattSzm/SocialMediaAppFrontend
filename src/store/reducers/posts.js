import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    shares: [],
    newsFeedPostsTimeStamp: null,
    newsFeedSharesTimeStamp: null,
    loading: false,
    hasMore: true
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_NEWSFEED_START:
            return {...state,
                loading: true,
                hasMore: true};
        case actionTypes.FETCH_NEWSFEED_SUCCESS:
            let hasMore = true;
            if(action.payload.tweets.length < 2 &&
                    action.payload.shares.length < 2){
                hasMore = false;
            }
            return {...state,
                posts: action.payload.tweets,
                shares: action.payload.shares,
                newsFeedPostsTimeStamp: action.payload.oldest_tweet_date,
                newsFeedSharesTimeStamp: action.payload.oldest_share_tweet,
                loading: false,
                hasMore: hasMore};
        case actionTypes.FETCH_NEWSFEED_FAIL:
            return {...state, loading: false};
        case actionTypes.LOAD_MORE_NEWSFEED_SUCCESS:
            const newPosts = [...state.posts].concat(action.payload.tweets);
            const newShares = [...state.shares].concat(action.payload.shares);
            let hasMoreMore = true;
            if(action.payload.tweets.length < 2 &&
                    action.payload.shares.length < 2){
                hasMoreMore = false;
            }
            return {...state,
                posts: newPosts,
                shares: newShares,
                newsFeedPostsTimeStamp: action.payload.oldest_tweet_date,
                newsFeedSharesTimeStamp: action.payload.oldest_share_tweet,
                loading: false,
                hasMore: hasMoreMore};
        default:
            return state;
    }
}

export default reducer;