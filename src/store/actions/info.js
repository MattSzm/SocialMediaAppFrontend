import axios from '../../axios';
import * as actionTypes from "./actionTypes";
import tokenConfig from "./auth";


export const loadPopularUsers = () =>{
    return (dispatch, getState) => {
        axios.get('/api/activity/popularusers/', tokenConfig(getState))
            .then(res => {
               dispatch({
                   type: actionTypes.LOAD_INFO_POPULAR_USERS_SUCCESS,
                   payload: res.data
               });
            })
            .catch(error => {
                if(error.response){
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: {
                            msg: {popularUsers: 'Unable to load popular users'},
                            status: 500
                        }
                    });
                }
            });
    }
}