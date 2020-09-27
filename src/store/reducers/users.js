import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: {},
    pickedUser: null,
    usersAsList: [],
    hasMoreAsList: null,
    linkToLoadMoreAsList: null
}

const reducer = (state=initialState, action) => {
    let hasMore = true;
    switch (action.type){
        case actionTypes.SAVE_USERS_SUCCESS:
            const id = action.payload.uuid;
            if(!(state.users[id])){
                let newUsers = {...state.users};
                newUsers[id] = action.payload;

                return {...state,
                    users: newUsers,
                    usersAsList: []};
            }
            return state;
        case actionTypes.FETCH_USER_SUCCESS:
            return {...state,
                    pickedUser: action.payload};
        case actionTypes.FETCH_USER_FAIL:
            return {...state,
                    pickedUser: null};
        case actionTypes.CLEAR_USERS:
            return {...state,
                    users: {},
                    pickedUser: null,
                    usersAsList: []};
        case actionTypes.CLEAR_PICKED_USER:
            return {...state,
                    pickedUser: null};
        case actionTypes.FOLLOW_USER:
            const pickedUserWithFollow = {...state.pickedUser,
                followed_by_current_user: true,
                number_followers: state.pickedUser.number_followers + 1};
            return {...state,
                    pickedUser: pickedUserWithFollow};
        case actionTypes.UNFOLLOW_USER:
            const pickedUserWithoutFollow = {...state.pickedUser,
                followed_by_current_user: false,
                number_followers: state.pickedUser.number_followers - 1};
            return {...state,
                    pickedUser: pickedUserWithoutFollow};
        case actionTypes.LOAD_FOLLOW_SUCCESS:
        case actionTypes.SEARCH_USERS_WITH_PHRASE_SUCCESS:
            if(action.status === 204){
                return {...state,
                    users: {},
                    usersAsList: []};
            }
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                    users: {},
                    usersAsList: action.payload.results,
                    linkToLoadMoreAsList: action.payload.next,
                    hasMoreAsList: hasMore}
        case actionTypes.LOAD_MORE_FOLLOW_SUCCESS:
        case actionTypes.SEARCH_MORE_USERS_WITH_PHRASE_SUCCESS:
            const newFollowUsers = [...state.usersAsList].concat(action.payload.results);
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                    users: {},
                    usersAsList: newFollowUsers,
                    linkToLoadMoreAsList: action.payload.next,
                    hasMoreAsList: hasMore};
        case actionTypes.SEARCH_USERS_WITH_PHRASE_START:
        case actionTypes.LOAD_FOLLOW_START:
            return {...state,
                    usersAsList: [],
                    hasMoreAsList: null,
                    linkToLoadMoreAsList: null}
        default:
            return state;
    }
}

export default reducer;