import * as ACTIONS from '../actions/feed.actions';

const initialState = {
    loadingStatus: false,
    meals: [],
    endOfResultsFlag: false,
    addresses: [],
    currentAddress: '',
    range: 5,
    tags: [],
    delivery: false,
    scrollCount: 1,
    message:''
};

export default function feedReducer(state = initialState, action) {
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
        case ACTIONS.PUT_ADDRESSES_IN_FEED:
            return{
                ...state,
                addresses: action.payload.addresses,
                currentAddress: action.payload.addresses[0]
            };
        case ACTIONS.CHANGE_ADDRESS:
            return{
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                currentAddress: action.payload
            };
        case ACTIONS.CHANGE_RANGE:
            return{
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                range: action.payload
            };
        case ACTIONS.CHANGE_TAG:
            let newTags = [];
            if(action.payload.checked){
                newTags = [...state.tags, action.payload.tag];
            }else{
                newTags = state.tags.filter(tagName => tagName !== action.payload.tag)
            }
            return{
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                tags: newTags
            }
        case ACTIONS.ADD_DELIVERY:
            return{
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                delivery: action.payload
            }
        case ACTIONS.BOTTOM_OF_PAGE:
            return{
                ...state,
                scrollCount: state.endOfResultsFlag ? state.scrollCount : state.scrollCount + 1
            }
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
                endOfResultsFlag: false,
                scrollCount: 1,
            };
        default:
            return state;
    }
};