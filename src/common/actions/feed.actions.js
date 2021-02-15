export const GET_MEALS = "GET_MEALS";
export const LOADING_STATUS_FEED = "LOADING_STATUS_FEED";
export const SET_FEED_ADDRESSES = "SET_FEED_ADDRESSES";
export const UPDATE_FEED_ADDRESSES = "UPDATE_FEED_ADDRESSES";
export const END_OF_RESULTS = "END_OF_RESULTS";
export const CHANGE_ADDRESS = "CHANGE_ADDRESS";
export const SEARCH_FEED = "SEARCH_FEED";
export const CHANGE_RANGE = "CHANGE_RANGE";
export const CHANGE_TAG = "CHANGE_TAG";
export const ADD_DELIVERY = "ADD_DELIVERY";
export const BOTTOM_OF_PAGE = "BOTTOM_OF_PAGE";
export const REDIRECT_FROM_FEED = "REDIRECT_FROM_FEED";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_FEED,
        payload
    };
};
export function getMeals(payload) {
    return {
        type: GET_MEALS,
        payload
    };
};
export function setFeedAddresses(payload) {
    return {
        type: SET_FEED_ADDRESSES,
        payload
    };
};
export function updateFeedAddresses(payload) {
    return {
        type: UPDATE_FEED_ADDRESSES,
        payload
    };
};
export function endOfResults(payload) {
    return {
        type: END_OF_RESULTS,
        payload
    };
};
export function changeAddress(payload) {
    return {
        type: CHANGE_ADDRESS,
        payload
    };
};
export function changeRange(payload) {
    return {
        type: CHANGE_RANGE,
        payload
    };
};
export function searchFeed(payload) {
    return {
        type: SEARCH_FEED,
        payload
    };
};
export function changeTag(payload) {
    return {
        type: CHANGE_TAG,
        payload
    };
};
export function addDelivery(payload) {
    return {
        type: ADD_DELIVERY,
        payload
    };
};
export function bottomOfPage(payload) {
    return {
        type: BOTTOM_OF_PAGE,
        payload
    };
};
export function redirectFromFeed(payload) {
    return {
        type: REDIRECT_FROM_FEED,
        payload
    };
};