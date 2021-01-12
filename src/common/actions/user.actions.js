export const GET_DAILY_SPECIALS = "GET_DAILY_SPECIALS";
export const LOADING_STATUS = "LOADING_STATUS";
export const END_OF_RESULTS = "END_OF_RESULTS";
export const CHANGE_RANGE_FOR_DAILY_SPECIALS = "CHANGE_RANGE_FOR_DAILY_SPECIALS";

export function loadingStatus(payload){
    return {
        type: LOADING_STATUS,
        payload
    };
}
export function getDailySpecials(payload){
    return {
        type: GET_DAILY_SPECIALS,
        payload
    };
};
export function endOfResults(payload){
    return {
        type: END_OF_RESULTS,
        payload
    }
}
export function changeRangeForDailySpecials(payload) {
    return {
        type: CHANGE_RANGE_FOR_DAILY_SPECIALS,
        payload
    }
}