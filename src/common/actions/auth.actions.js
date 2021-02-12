export const LOADING_STATUS_AUTH = "LOADING_STATUS_AUTH";
export const LOGOUT = "LOGOUT";
export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const ADD_NEW_ADDRESS = "ADD_NEW_ADDRESS";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_AUTH,
        payload
    };
};

export function logOut(payload) {
    return {
        type: LOGOUT,
        payload
    };
};

export function getProfileData(payload) {
    return {
        type: GET_PROFILE_DATA,
        payload
    };
};

export function addNewAddress(payload) {
    return {
        type: ADD_NEW_ADDRESS,
        payload
    };
};

export function removeAddress(payload) {
    return {
        type: REMOVE_ADDRESS,
        payload
    };
};