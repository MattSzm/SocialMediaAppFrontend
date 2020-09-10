import * as actionTypes from './actionTypes';


export const createMessage = msg => {
    return {
        type: actionTypes.CREATE_MESSAGE,
        payload: msg
    };
};

export const createError = (msg, body) => {
    return {
        type: actionTypes.GET_ERRORS,
        payload: {
            msg: {[msg]: body},
            status: 400
        }
    };
};
