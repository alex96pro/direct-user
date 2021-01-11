import * as ACTIONS from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    signUpmessage: '',
    signUpSuccess: false,
    logInMessage: '',
    forgottenPasswordSuccess: false,
    forgottenPasswordMessage: '',
    changePasswordSuccess: false,
    changePasswordMessage: '',
    user: {}
};

export default function authReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS:
            return{
                ...state,
                loadingStatus: action.payload,
                signUpmessage:''
            };
        case ACTIONS.SIGN_UP_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                signUpmessage:action.payload,
                signUpSuccess:true
            };
        case ACTIONS.SIGN_UP_FAILED:
            return{
                ...state,
                loadingStatus: false,
                signUpmessage: action.payload,
                signUpSuccess:false
            };
        case ACTIONS.LOG_IN_FAILED:
            return{
                ...state,
                loadingStatus: false,
                logInMessage: action.payload
            };
        case ACTIONS.VERIFIED_ACCOUNT:
            return{
                ...state,
                loadingStatus: false
            };
        case ACTIONS.FORGOTTEN_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordSuccess: true,
                forgottenPasswordMessage: action.payload
            };
        case ACTIONS.FORGOTTEN_PASSWORD_FAILED:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordSuccess: false,
                forgottenPasswordMessage: action.payload
            };
        case ACTIONS.PROFILE:
            return{
                ...state,
                loadingStatus: false,
                user: action.payload
            };
        case ACTIONS.CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                changePasswordSuccess: true,
            };
        case ACTIONS.CHANGE_PASSWORD_FAILED:
            return{
                ...state,
                loadingStatus: false,
                changePasswordMessage: action.payload,
                changePasswordSuccess:false
            };
        default:
            return state;
    }
};