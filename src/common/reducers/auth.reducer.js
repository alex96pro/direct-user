import * as ACTIONS from '../actions/auth.actions';

const initialState = {
    loadingStatus: false,
    email: '',
    phone: '',
    addresses: []
};

export default function authReducer(state = initialState, action) {
    switch(action.type){
        case ACTIONS.LOADING_STATUS_AUTH:
            return{
                ...state,
                loadingStatus: action.payload,
                signUpMessage:''
            };
        case ACTIONS.GET_PROFILE_DATA:
            return{
                ...state,
                email: action.payload.email,
                phone: action.payload.phone,
                addresses: action.payload.addresses,
                loadingStatus: false
            };
        case ACTIONS.ADD_NEW_ADDRESS:
            return{
                ...state,
                loadingStatus: false,
                addresses: [...state.addresses, action.payload]
            };
        case ACTIONS.REMOVE_ADDRESS:
            return{
                ...state,
                loadingStatus: false,
                addresses: state.addresses.filter(address => address.addressId !== action.payload)
            };
        default:
            return state;
    }
};