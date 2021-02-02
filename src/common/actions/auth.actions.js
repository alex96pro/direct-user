export const LOADING_STATUS_AUTH = "LOADING_STATUS_AUTH";
export const LOGOUT = "LOGOUT";
export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const UPDATE_ADDRESSES = "UPDATE_ADDRESSES";

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

export function updateAddresses(payload) {
    return {
        type: UPDATE_ADDRESSES,
        payload
    };
};