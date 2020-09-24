import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: []
}


const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOAD_INFO_POPULAR_USERS_SUCCESS:
            return {...state,
                    users: action.payload};
        default:
            return state;
    }
}

export default reducer;