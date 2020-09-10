import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: {},
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.SAVE_USERS:
            const id = action.payload.uuid;
            let newUsers = {...state.users};
            newUsers[id] = action.payload;
            return {...state, users: newUsers};
        default:
            return state;
    }
}

export default reducer;