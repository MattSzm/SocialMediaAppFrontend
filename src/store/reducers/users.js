import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: {},
    pickedUser: null,
    usersFollow: [],
    hasMoreFollow: null,
    linkToLoadMoreFollow: null
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
                    usersFollow: []};
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
                    usersFollow: []};
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
        case actionTypes.FETCH_FOLLOW_SUCCESS:
            if(action.status === 204){
                return {...state,
                    users: {},
                    usersFollow: []};
            }
            if(!action.payload.next){
                hasMore = false;
            }
            return {...state,
                    users: {},
                    usersFollow: action.payload.results,
                    linkToLoadMoreFollow: action.payload.next,
                    hasMoreFollow: hasMore}
        default:
            return state;
    }
}

export default reducer;