import * as ACTIONS from '../actions/cart.actions';

const initialState = {
    meals: [],
    cartSize: 0,
    minimumDeliveryConflicts: [],
    deliveryAddress:''
};

export default function cartReducer(state = initialState, action) {
    let newMeals = [];
    switch(action.type){
        case ACTIONS.ADD_TO_CART:
            return{
                ...state,
                meals: [...state.meals, action.payload],
                cartSize: +state.cartSize + +action.payload.amount,
                deliveryAddress: action.payload.deliveryAddress
            };
        case ACTIONS.REMOVE_FROM_CART:
            newMeals = state.meals.filter((meal, index) => index !== action.payload);
            return{
                ...state,
                meals: newMeals,
                cartSize: state.cartSize - state.meals[action.payload].amount,
                deliveryAddress: newMeals.length === 0 ? '' : state.deliveryAddress
            }
        case ACTIONS.CHANGE_AMOUNT:
            for(let i = 0; i < state.meals.length; i++){
                if(i !== action.payload.index){
                    newMeals.push(state.meals[i]);
                }else{
                    newMeals.push({...state.meals[i], amount: action.payload.newAmount});
                }
            }
            return{
                ...state,
                meals: newMeals,
                cartSize: state.cartSize - state.meals[action.payload.index].amount + +action.payload.newAmount
            }
        case ACTIONS.MINIMUM_DELIVERY_CHECK:
            return {
                ...state,
                minimumDeliveryConflicts: action.payload
            }
        default:
            return state;
    }
};