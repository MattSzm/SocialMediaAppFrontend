import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: [],
    hashtags: []
}


const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOAD_INFO_POPULAR_USERS_SUCCESS:
            return {...state,
                    users: action.payload};
        case actionTypes.LOAD_HASHTAG_TRENDS_SUCCESS:
            if (action.status === 204){
                return {...state,
                        hashtags: []};
            }
            else{
                return {...state,
                        hashtags: action.payload.hashtags};
            }
        default:
            return state;
    }
}

export default reducer;