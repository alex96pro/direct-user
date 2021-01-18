export const GET_MEALS = "GET_MEALS";
export const LOADING_STATUS_FEED = "LOADING_STATUS_FEED";
export const END_OF_RESULTS = "END_OF_RESULTS";
export const CLEAR_MEALS = "CLEAR_MEALS";

export function loadingStatus(payload) {
    return {
        type: LOADING_STATUS_FEED,
        payload
    };
}
export function getMeals(payload) {
    return {
        type: GET_MEALS,
        payload
    };
};
export function endOfResults(payload) {
    return {
        type: END_OF_RESULTS,
        payload
    };
};
export function clearMeals(payload) {
    return {
        type: CLEAR_MEALS,
        payload
    };
};