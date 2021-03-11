export const ADD_TO_CART = "ADD_TO_CART";
export const EDIT_CART_MEAL = "EDIT_CART_MEAL";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const CHANGE_NOTES = "CHANGE_NOTES";
export const MINIMUM_DELIVERY_CHECK = "MINIMUM_DELIVERY_CHECK";
export const SEND_ORDER = "SEND_ORDER";
export const ORDER_ACCEPTED = "ORDER_ACCEPTED";
export const ORDER_REJECTED = "ORDER_REJECTED";

export function addToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload
    };
};
export function editCartMeal(payload) {
    return {
        type: EDIT_CART_MEAL,
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
