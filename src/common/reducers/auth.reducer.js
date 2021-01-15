import * as ACTIONS from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    signUpMessage: '',
    signUpSuccess: false,
    logInMessage: '',
    forgottenPasswordSuccess: false,
    forgottenPasswordMessage: '',
    changePasswordSuccess: false,
    changePasswordMessage: '',
    newPasswordMessage:'',
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
        case ACTIONS.SIGN_UP_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                signUpMessage: action.payload,
                signUpSuccess: true
            };
        case ACTIONS.SIGN_UP_FAILED:
            return{
                ...state,
                loadingStatus: false,
                signUpMessage: action.payload,
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
        case ACTIONS.NEW_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                newPasswordMessage: action.payload
            }
        default:
            return state;
    }
};