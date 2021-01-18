import * as ACTIONS from '../actions/feed.actions';

const initialState = {
    loadingStatus: false,
    meals:[],
    endOfResultsFlag: false,
    message:''
};

export default function userReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_FEED:
            return{
                ...state,
                loadingStatus: action.payload
            };
        case ACTIONS.GET_MEALS:
            let newArray = state.meals.concat(action.payload.meals);
            return{
                ...state,
                meals: newArray,
                loadingStatus: false,
                endOfResultsFlag: false,
                message: newArray.length <= 2 ? 'End of results': ''
            };
        case ACTIONS.END_OF_RESULTS:
            return{
                ...state,
                loadingStatus: false,
                message: action.payload,
                endOfResultsFlag: true
            };
        case ACTIONS.CLEAR_MEALS:
            return{
                ...state,
                meals:[],
                message:'',
                endOfResultsFlag: false
            };
        default:
            return state;
    }
};