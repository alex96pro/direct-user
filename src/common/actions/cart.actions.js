export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const CHANGE_NOTES = "CHANGE_NOTES";
export const MINIMUM_DELIVERY_CHECK = "MINIMUM_DELIVERY_CHECK";

export function addToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload
    };
};
export function removeFromCart(payload) {
    return {
        type: REMOVE_FROM_CART,
        payload
    };
};
export function changeAmount(payload) {
    return {
        type: CHANGE_AMOUNT,
        payload
    };
};
export function changeNotes(payload) {
    return {
        type: CHANGE_NOTES,
        payload
    };
};
export function minimumDeliveryCheck(payload) {
    return {
        type: MINIMUM_DELIVERY_CHECK,
        payload
    };
};
