import * as ACTIONS from '../actions/menu.actions';

const initialState = {
    loadingStatus: false,
    meals:[]
};

export default function menuReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_MENU:
            return{
                ...state,
                loadingStatus: action.payload
            }
        case ACTIONS.GET_MEALS_FROM_MENU:
            return{
                ...state,
                loadingStatus: false,
                meals: action.payload
            };
        case ACTIONS.CLEAR_MENU:
            return{
                ...state,
                loadingStatus: false,
                meals: []
            }
        default:
            return state;
    }
};