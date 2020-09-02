import * as actionTypes from '../actions/actionTypes';


const initialState = {
    // token: 'fsdkjfdskjfdsf65ds1fsdfs'
    token: null,
    AuthRedirectPath: '/'
}


const reducer = (state= initialState, action) =>{
    switch (action.type){
        case actionTypes.LOGIN_SUCCESS:
            console.log(action.payload);
            break;
        case actionTypes.LOGIN_FAIL:
            console.log('FAILLLLLLLLL!!!!!!');
            break;
        default:
            return state;
    }
    return state;
}

export default reducer;