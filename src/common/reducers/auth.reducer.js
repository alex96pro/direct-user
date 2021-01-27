import * as ACTIONS from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    user: {},
};

export default function authReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_AUTH:
            return{
                ...state,
                loadingStatus: action.payload,
                signUpMessage:''
            };
        case ACTIONS.GET_PROFILE_DATA:
            return{
                ...state,
                user: action.payload,
                loadingStatus: false
            };
        case ACTIONS.UPDATE_ADDRESSES:
            return{
                loadingStatus: false,
                user: {...state.user, addresses: action.payload},
                currentAddress: action.payload[0] ? action.payload[0]: ''
            };
        default:
            return state;
    }
};