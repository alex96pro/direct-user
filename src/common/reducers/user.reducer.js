import * as ACTIONS from '../actions/user.actions';

const initialState = {
    loadingStatus: false,
    meals:[],
    endOfResultsFlag: false,
    message:''
};

export default function userReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS:
            return{
                ...state,
                loadingStatus: action.payload
            }
        case ACTIONS.GET_DAILY_SPECIALS:
            let newArray = state.meals.concat(action.payload.meals);
            return{
                ...state,
                meals: newArray,
                loadingStatus: false,
                endOfResultsFlag: false
            };
        case ACTIONS.END_OF_RESULTS:
            return{
                ...state,
                loadingStatus: false,
                message: action.payload,
                endOfResultsFlag: true
            }
        case ACTIONS.CHANGE_RANGE_FOR_DAILY_SPECIALS:
            return{
                ...state,
                meals:[]
            }
        default:
            return state;
    }
};