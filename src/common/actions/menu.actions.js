export const GET_MEALS_FROM_MENU = "GET_MEALS_FROM_MENU";
export const LOADING_STATUS_MENU = "LOADING_STATUS_MENU";
export const CLEAR_MENU = "CLEAR_MENU";
export const NO_MEALS_IN_MENU = "NO_MEALS_IN_MENU";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_MENU,
        payload
    };
};

export function getMealsFromMenu(payload) {
    return {
        type: GET_MEALS_FROM_MENU,
        payload
    };
};

export function clearMenu(payload) {
    return {
        type: CLEAR_MENU,
        payload
    };
};

export function noMealsInMenu(payload) {
    return {
        type: NO_MEALS_IN_MENU,
        payload
    };
};
