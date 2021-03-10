export const LOADING_STATUS_MODIFIERS = "LOADING_STATUS_MODIFIERS";
export const GET_MEAL_MODIFIERS = "GET_MEAL_MODIFIERS";
export const GET_SPECIAL_MODIFIERS = "GET_SPECIAL_MODIFIERS";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_MODIFIERS,
        payload
    };
};
export function getMealModifiers(payload) {
    return {
        type: GET_MEAL_MODIFIERS,
        payload
    };
};
export function getSpecialModifiers(payload) {
    return {
        type: GET_SPECIAL_MODIFIERS,
        payload
    };
};