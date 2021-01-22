import * as ACTIONS from '../actions/restaurant-auth.actions';

const initialState = {
    loadingStatus: false,
    restaurant:{},
    loginMessage:'',
    forgottenPasswordMessage: '',
    forgottenPasswordSuccess: false,
    newPasswordRestaurantMessage: ''
};

export default function restaurantAuthReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_RESTAURANT_AUTH:
            return{
                ...state,
                loadingStatus: action.payload
            };
        case ACTIONS.LOGIN_RESTAURANT_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                loginMessage:'',
            };
        case ACTIONS.LOG_IN_FAILED:
            return{
                ...state,
                loadingStatus: false,
                loginMessage: action.payload
            };
        case ACTIONS.FORGOTTEN_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordMessage: action.payload,
                forgottenPasswordSuccess: true
            };
        case ACTIONS.FORGOTTEN_PASSWORD_FAILED:
            return{
                ...state,
                loadingStatus: false,
                forgottenPasswordMessage: action.payload,
                forgottenPasswordSuccess: false
            };
        case ACTIONS.NEW_PASSWORD_SUCCESS:
            return{
                ...state,
                loadingStatus: false,
                newPasswordRestaurantMessage: action.payload
            }
        default:
            return state;
    }
};