import * as actionTypes from '../actions/actionTypes';

const initialState = {
    message: {},
    status: null
};

export default function (state=initialState, action){
    switch (action.type){
        case actionTypes.GET_ERRORS:
            return {
                message: action.payload.msg,
                status: action.payload.status
            };
        default:
            return state;
    }
}