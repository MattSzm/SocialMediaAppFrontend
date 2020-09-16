import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    newsFeedTimeStamp: null,
    linkToLoadMoreUserPage: null,
    loading: false,
    hasMore: true
}

const mergePostsWithShares = (posts, shares) => {
    let postIndex = 0;
    let shareIndex = 0;
    let output = []
    while (postIndex < posts.length &&
    shareIndex < shares.length){
        if(posts[postIndex].created > shares[shareIndex].created){
            output.push(posts[postIndex]);
            postIndex++;
        } else{
            output.push(shares[shareIndex]);
            shareIndex++;
        }
    }
    while (postIndex < posts.length){
        output.push(posts[postIndex]);
        postIndex++;
    }
    while (shareIndex < shares.length){
        output.push(shares[shareIndex]);
        shareIndex++;
    }
    return output;
}

const reducer = (state=initialState, action) => {
    let hasMore = true;
    switch (action.type){
        case actionTypes.FETCH_NEWSFEED_START:
        case actionTypes.FETCH_USER_POSTS_START:
            return {...state,
                posts: [],
                newsFeedTimeStamp: null,
                linkToLoadMoreUserPage: null,
                loading: true,
                hasMore: true}
        case actionTypes.LOAD_MORE_NEWSFEED_START:
        case actionTypes.LOAD_MORE_USER_POSTS_START:
            return {...state,
                loading: true,
                hasMore: true};
        case actionTypes.FETCH_NEWSFEED_SUCCESS:
            if((action.payload.tweets.length +
                    action.payload.shares.length) < 10){
                hasMore = false;
            }
            const mergedPosts = mergePostsWithShares(
                    action.payload.tweets,
                    action.payload.shares);
            return {...state,
                posts: mergedPosts,
                newsFeedTimeStamp: action.payload.time_stamp,
                loading: false,
                hasMore: hasMore};
        case actionTypes.FETCH_NEWSFEED_FAIL:
        case actionTypes.FETCH_USER_POSTS_FAIL:
            return {...state, loading: false};
        case actionTypes.CLEAR_POSTS:
            return {...state,
                posts: [],
                newsFeedTimeStamp: null,
                linkToLoadMoreUserPage: null,
                loading: false,
                hasMore: true}
        case actionTypes.LOAD_MORE_NEWSFEED_SUCCESS:
            const newMergedPosts = mergePostsWithShares(
                action.payload.tweets,
                action.payload.shares
            );
            const newPosts = [...state.posts].concat(newMergedPosts);
            if((action.payload.tweets.length +
                    action.payload.shares.length) < 10){
                hasMore = false;
            }
            return {...state,
                posts: newPosts,
                newsFeedTimeStamp: action.payload.time_stamp,
                loading: false,
                hasMore: hasMore};
        case actionTypes.CREATE_POST_START:
            return {...state,
                loading: true};
        case actionTypes.CREATE_POST_SUCCESS:
            let newPostsWithCreated = [...state.posts]
            newPostsWithCreated.unshift(action.payload)
            return {...state,
                posts: newPostsWithCreated,
                loading: false}
        case actionTypes.CREATE_POST_FAIL:
            return {...state,
                loading: false};
        case actionTypes.FETCH_USER_POSTS_SUCCESS:
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                posts: action.payload.results,
                linkToLoadMoreUserPage: action.payload.next,
                loading: false,
                hasMore: hasMore};
        case actionTypes.LOAD_MORE_USER_POSTS_SUCCESS:
            const newPostsUserPosts = [...state.posts].concat(action.payload.results)
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                posts: newPostsUserPosts,
                linkToLoadMoreUserPage: action.payload.next,
                loading: false,
                hasMore: hasMore};
        default:
            return state;
    }
}

export default reducer;