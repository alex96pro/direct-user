export const LOGOUT = "LOGOUT";
export const VERIFY = "VERIFY";
export const LOADING_STATUS_AUTH = "LOADING_STATUS_AUTH";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED = "SIGN_UP_FAILED";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const VERIFIED_ACCOUNT = "VERIFIED_ACCOUNT";
export const FORGOTTEN_PASSWORD_SUCCESS = "FORGOTTEN_PASSWORD_SUCCESS";
export const FORGOTTEN_PASSWORD_FAILED = "FORGOTTEN_PASSWORD_FAILED";
export const PROFILE = "PROFILE";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";
export const NEW_PASSWORD_SUCCESS = "NEW_PASSWORD_SUCCESS";

export function loginFailed(payload){
    return {
        type: LOG_IN_FAILED,
        payload
    };
};
export function loadingStatus(payload){
    return {
        type: LOADING_STATUS_AUTH,
        payload
    };
};
export function signUpSuccess(payload){
    return {
        type: SIGN_UP_SUCCESS,
        payload
    };
};
export function signUpFailed(payload){
    return{
        type: SIGN_UP_FAILED,
        payload
    };
};
export function logOut(payload){
    return{
        type: LOGOUT,
        payload
    };
};
export function verifiedAccount(payload){
    return{
        type: VERIFIED_ACCOUNT,
        payload
    };
};
export function forgottenPasswordFailed(payload){
    return{
        type: FORGOTTEN_PASSWORD_FAILED,
        payload
    };
};
export function forgottenPasswordSuccess(payload){
    return{
        type: FORGOTTEN_PASSWORD_SUCCESS,
        payload
    };
};
export function profile(payload){
    return{
        type: PROFILE,
        payload
    };
};
export function changePasswordSuccess(payload){
    return{
        type: CHANGE_PASSWORD_SUCCESS,
        payload
    };
};
export function changePasswordFailed(payload){
    return{
        type: CHANGE_PASSWORD_FAILED,
        payload
    };
};
export function newPasswordSuccess(payload){
    return{
        type: NEW_PASSWORD_SUCCESS,
        payload
    }
}