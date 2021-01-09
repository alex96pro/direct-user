import { LOADING_STATUS, SIGN_UP_SUCCESS, SIGN_UP_FAILED, LOG_IN_FAILED, VERIFIED_ACCOUNT, FORGOTTEN_PASSWORD_SUCCESS, FORGOTTEN_PASSWORD_FAILED, PROFILE, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED } from '../actions/auth.actions';

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
        case LOADING_STATUS:
            return{
                ...state,
                loadingStatus: true,
                signUpmessage:''
            }
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                signUpmessage:`Signed up successfully! Please check your email: ${action.payload} to verify your account`,
                signUpSuccess:true
            }
        case SIGN_UP_FAILED:
            return{
                ...state,
                loadingStatus: false,
                signUpmessage: 'email '+action.payload+" is already in use",
                signUpSuccess:false
            }
        case LOG_IN_FAILED:
            return{
                ...state,
                loadingStatus: false,
                logInMessage: action.payload
            }
        case VERIFIED_ACCOUNT:
            return{
                ...state,
                loadingStatus: false
            }
        case FORGOTTEN_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordSuccess: true,
                forgottenPasswordMessage: action.payload
            }
        case FORGOTTEN_PASSWORD_FAILED:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordSuccess: false,
                forgottenPasswordMessage: action.payload
            }
        case PROFILE:
            return{
                ...state,
                loadingStatus: false,
                user: action.payload
            }
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                changePasswordSuccess: true,
            }
        case CHANGE_PASSWORD_FAILED:
            return{
                ...state,
                loadingStatus: false,
                changePasswordMessage: action.payload
            }
        default:
            return state;
    }
};