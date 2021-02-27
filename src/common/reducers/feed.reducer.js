import * as ACTIONS from '../actions/feed.actions';
import { LOGOUT } from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    meals: [],
    endOfResultsFlag: false,
    addresses: [],
    currentAddress:'',
    range: 10,
    search:'',
    tags: [],
    delivery: false,
    scrollCount: 1,
    redirectedToFeed: false,
    message:''
};

export default function feedReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_FEED:
            return {
                ...state,
                loadingStatus: action.payload
            };
        case ACTIONS.GET_MEALS:
            let newArray = state.meals.concat(action.payload.meals);
            return {
                ...state,
                meals: newArray,
                loadingStatus: false,
                endOfResultsFlag: false,
                message: newArray.length <= 2 ? 'End of results': ''
            };
        case ACTIONS.SET_FEED_ADDRESSES:
            return {
                ...state,
                addresses: action.payload,
                currentAddress: action.payload[0]
            };
        case ACTIONS.UPDATE_FEED_ADDRESSES:
            let newFeedAddresses = [];
            if(action.payload.type === "ADD"){
                newFeedAddresses = [...state.addresses, action.payload.address];
            }else{
                newFeedAddresses = state.addresses.filter(address => address.addressId !== action.payload.addressId);
            }
            return {
                ...state,
                addresses: newFeedAddresses
            }
        case ACTIONS.CHANGE_ADDRESS:
            if(state.currentAddress !== action.payload){
                return {
                    ...state,
                    meals:[],
                    scrollCount: 1,
                    endOfResultsFlag: false,
                    currentAddress: action.payload,
                    redirectedToFeed: false
                };
            }else{
                return state;
            }
            
        case ACTIONS.CHANGE_RANGE:
            return {
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                redirectedToFeed: false,
                range: action.payload
            };
        case ACTIONS.SEARCH_FEED:
            return {
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                redirectedToFeed: false,
                search: action.payload
            }
        case ACTIONS.CHANGE_TAG:
            let newTags = [];
            if(action.payload.checked){
                newTags = [...state.tags, action.payload.tag];
            }else{
                newTags = state.tags.filter(tagName => tagName !== action.payload.tag)
            }
            return {
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                tags: newTags,
                redirectedToFeed: false
            }
        case ACTIONS.ADD_DELIVERY:
            return {
                ...state,
                meals:[],
                scrollCount: 1,
                endOfResultsFlag: false,
                delivery: action.payload,
                redirectedToFeed: false
            }
        case ACTIONS.BOTTOM_OF_PAGE:
            return {
                ...state,
                scrollCount: state.endOfResultsFlag ? state.scrollCount : state.scrollCount + 1,
                redirectedToFeed: false
            }
        case ACTIONS.END_OF_RESULTS:
            return {
                ...state,
                loadingStatus: false,
                message: action.payload,
                endOfResultsFlag: true
            };
        case ACTIONS.REDIRECT_FROM_FEED:
            return {
                ...state,
                redirectedToFeed: true
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};