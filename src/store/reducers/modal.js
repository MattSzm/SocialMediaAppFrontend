import * as actionTypes from '../actions/actionTypes';


const initialState = {
    showModal: false
}


const reducer = (state= initialState, action) =>{
    switch (action.type){
        case actionTypes.MODAL_TOGGLE:
            const prevState = state.showModal;
            return {...state, showModal: !prevState};
        default:
            return state;
    }
}

export default reducer;