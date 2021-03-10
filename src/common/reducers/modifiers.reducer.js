import * as ACTIONS from '../actions/modifiers.actions';
import { LOGOUT } from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    modifiers:[]
};

export default function mealReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_MODIFIERS:
            return {
                ...state,
                loadingStatus: action.payload
            };
        case ACTIONS.GET_MEAL_MODIFIERS:
            return {
                ...state,
                loadingStatus: false,
                modifiers: action.payload
            };
        case ACTIONS.GET_SPECIAL_MODIFIERS:
            return {
                ...state,
                loadingStatus: false,
                modifiers: action.payload
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};