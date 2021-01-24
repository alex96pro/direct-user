export const LOADING_STATUS_AUTH = "LOADING_STATUS_AUTH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PROFILE = "PROFILE";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_AUTH,
        payload
    };
};
export function login(payload) {
    return {
        type: LOGIN,
        payload
    };
};
export function logOut(payload) {
    return {
        type: LOGOUT,
        payload
    };
};
export function profile(payload) {
    return {
        type: PROFILE,
        payload
    };
};