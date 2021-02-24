import * as ACTIONS from '../actions/order.actions';

const initialState = {
    loadingStatus: false,
    orderSent: false,
    order: {},
    estimatedTime:'',
    rejectReason:''
};

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_ORDER:
            return{
                ...state,
                loadingStatus: action.payload
            };
        case ACTIONS.SEND_ORDER:
            return{
                ...state,
                loadingStatus: true,
                orderSent: true
            };
        case ACTIONS.ORDER_ACCEPTED:
            return{
                ...state,
                loadingStatus: false,
                estimatedTime: action.payload
            };
        case ACTIONS.ORDER_REJECTED:
            return{
                ...state,
                loadingStatus: false,
                rejectReason: action.payload
            };
        default:
            return state;
    }
};