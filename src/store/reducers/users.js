import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: {},
    pickedUser: null,
    error: null
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.SAVE_USERS_SUCCESS:
            const id = action.payload.uuid;
            if(!(state.users[id])){
                let newUsers = {...state.users};
                newUsers[id] = action.payload;
                return {...state,
                    users: newUsers};
            }
            return state;
        case actionTypes.FETCH_USER_SUCCESS:
            return {...state,
                    pickedUser: action.payload};
        case actionTypes.FETCH_USER_FAIL:
            return {...state,
                    pickedUser: null,
                    error: action.payload};
        case actionTypes.CLEAR_USERS:
            return {...state,
                    users: {},
                    pickedUser: null,
                    error: null};
        case actionTypes.CLEAR_PICKED_USER:
            return {...state,
                    pickedUser: null,
                    error: null}
        default:
            return state;
    }
}

export default reducer;