export const LOADING_STATUS_ORDER = "LOADING_STATUS_ORDER";
export const ORDER_ACCEPTED = "ORDER_ACCEPTED";
export const ORDER_REJECTED = "ORDER_REJECTED";
export const SEND_ORDER = "SEND_ORDER";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_ORDER,
        payload
    };
};
export function sendOrder(payload) {
    return {
        type: SEND_ORDER,
        payload
    };
};
export function orderAccepted(payload) {
    return {
        type: ORDER_ACCEPTED,
        payload
    };
};
export function orderRejected(payload) {
    return {
        type: ORDER_REJECTED,
        payload
    };
};