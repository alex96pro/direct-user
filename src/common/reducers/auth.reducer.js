import * as ACTIONS from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    user: {}
};

export default function authReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_AUTH:
            return{
                ...state,
                loadingStatus: action.payload,
                signUpMessage:''
            };
        case ACTIONS.PROFILE:
            return{
                ...state,
                user: action.payload,
                loadingStatus: false
            }
        default:
            return state;
    }
};