import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    newsFeedTimeStamp: null,
    linkToLoadMoreUserPage: null,
    loading: false,
    hasMore: true,
    loadingCreatePost: false
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
                loadingCreatePost: true};
        case actionTypes.CREATE_POST_SUCCESS:
            let newPostsWithCreated = [...state.posts];
            newPostsWithCreated.unshift(action.payload);
            return {...state,
                posts: newPostsWithCreated,
                loadingCreatePost: false}
        case actionTypes.CREATE_POST_FAIL:
            return {...state,
                loadingCreatePost: false};
        case actionTypes.FETCH_USER_POSTS_SUCCESS:
            if(action.status === 204){
                return {...state,
                    posts: [],
                    linkToLoadMoreUserPage: null,
                    loading: false,
                    hasMore: false}
            }
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                posts: action.payload.results,
                linkToLoadMoreUserPage: action.payload.next,
                loading: false,
                hasMore: hasMore};
        case actionTypes.LOAD_MORE_USER_POSTS_SUCCESS:
            const newPostsUserPosts = [...state.posts].concat(action.payload.results);
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                posts: newPostsUserPosts,
                linkToLoadMoreUserPage: action.payload.next,
                loading: false,
                hasMore: hasMore};
        case actionTypes.DELETE_POST:
            const newPostsWithoutDeleted = state.posts.filter(
                (post) => {
                    if(post.tweet_itself) {
                        return post.tweet_itself.uuid !== action.payloadUuid;
                    }
                    return post.uuid !== action.payloadUuid;
                });
            return {...state,
                posts: newPostsWithoutDeleted};
        case actionTypes.CREATE_LIKE_POST:
            const newPostsWithLike = [...state.posts].map(
                (post) => {
                    if (post.tweet_itself) {
                        if (post.tweet_itself.uuid === action.payloadUuid) {
                            const newPost = {...post,
                                tweet_itself: {...post.tweet_itself,
                                    liked_by_current_user: true,
                                    number_likes: post.tweet_itself.number_likes + 1}};
                            return newPost;
                        }
                    } else {
                        if (post.uuid === action.payloadUuid) {
                            const newPost = {...post};
                            newPost.liked_by_current_user = true;
                            newPost.number_likes += 1;
                            return newPost;
                        }
                    }
                    return post;
                });
            return {...state,
                posts: newPostsWithLike};
        case actionTypes.DELETE_LIKE_POST:
            const newPostsWithoutLike = [...state.posts].map(
                (post) => {
                    if (post.tweet_itself) {
                        if (post.tweet_itself.uuid === action.payloadUuid) {
                            const newPost = {...post,
                                tweet_itself: {...post.tweet_itself,
                                liked_by_current_user: false,
                                number_likes: post.tweet_itself.number_likes - 1}};
                            return newPost;
                        }
                    } else {
                        if (post.uuid === action.payloadUuid) {
                            const newPost = {...post};
                            newPost.liked_by_current_user = false;
                            newPost.number_likes -= 1;
                            return newPost;
                        }
                    }
                    return post;
                });
            return {...state,
                posts: newPostsWithoutLike};
        case actionTypes.CREATE_SHARE_POST:
            let newPostsWithShare = [...state.posts].map(
                (post) => {
                    if (post.tweet_itself) {
                        if (post.tweet_itself.uuid === action.payloadUuid) {
                            const newPost = {...post,
                                tweet_itself: {...post.tweet_itself,
                                    shared_by_current_user: true,
                                    number_shares: post.tweet_itself.number_shares + 1}};
                            return newPost;
                        }
                    } else {
                        if (post.uuid === action.payloadUuid) {
                            const newPost = {...post};
                            newPost.shared_by_current_user = true;
                            newPost.number_shares += 1;
                            return newPost;
                        }
                    }
                    return post;
                });
            newPostsWithShare.unshift(action.payload);
            return {...state,
                posts: newPostsWithShare};
        case actionTypes.DELETE_SHARE_POST:
            const newPostsWithoutShare = [...state.posts].map(
                (post) => {
                    if(post.tweet_itself) {
                        if (post.tweet_itself.uuid === action.payloadPostUuid) {
                                const newPost = {
                                    ...post,
                                    tweet_itself: {
                                        ...post.tweet_itself,
                                        shared_by_current_user: false,
                                        number_likes: post.tweet_itself.number_shares - 1
                                    }
                                };
                                return newPost;
                        }
                    }
                    else {
                        if (post.uuid === action.payloadPostUuid) {
                            const newPost = {...post};
                            newPost.shared_by_current_user = false;
                            newPost.number_shares -= 1;
                            return newPost;
                        }
                    }
                    return post;
                })
                let newPostsWithoutShareOutput = null;
                if(state.newsFeedTimeStamp) {
                     newPostsWithoutShareOutput = newPostsWithoutShare.filter(
                        (post) => {
                            if (post.tweet_itself) {
                                if ((post.tweet_itself.uuid === action.payloadPostUuid) &&
                                    (`${post.account}`.substring(36, post.account.length - 1) ===
                                        action.payloadUserUuid)) {
                                    return false;
                                }
                            }
                            return true;
                        });
                }
                else{
                     newPostsWithoutShareOutput = newPostsWithoutShare.filter(
                        (post) => {
                            if ((post.uuid === action.payloadPostUuid) &&
                                (`${post.user}`.substring(36, post.user.length - 1) !==
                                    action.payloadUserUuid)) {
                                return false;
                            }
                            return true;
                    });
                }
            return {...state,
                posts: newPostsWithoutShareOutput};
        default:
            return state;
    }
}

export default reducer;