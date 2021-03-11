import * as ACTIONS from '../actions/cart.actions';
import { LOGOUT } from '../actions/auth.actions';

const initialState = {
    meals: [],
    cartSize: 0,
    minimumDeliveryConflicts: [],
    deliveryAddress:'',
    waitingForResponses: false,
    numberOfOrders: 0,
    ordersResponses: [],
    loadingStatus: false
};

export default function cartReducer(state = initialState, action) {
    let newMeals = [];
    let newCartSize = 0;
    switch(action.type){
        case ACTIONS.ADD_TO_CART:
            return{
                ...state,
                meals: [...state.meals, action.payload.meal],
                cartSize: +state.cartSize + +action.payload.meal.amount,
                deliveryAddress: action.payload.deliveryAddress
            };
        case ACTIONS.EDIT_CART_MEAL:
            for(let i = 0; i < state.meals.length; i++){
                if(i === action.payload.index){
                    newMeals.push({
                        ...state.meals[i], 
                        amount: action.payload.amount,
                        price: action.payload.price,
                        notes: action.payload.notes,
                        selectedModifiers: action.payload.selectedModifiers
                    });
                }else{
                    newMeals.push(state.meals[i]);
                }
            }
            return{
                ...state,
                meals: newMeals,
                cartSize: state.cartSize - state.meals[action.payload.index].amount + +action.payload.amount
            }
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
                    let newAmount, newPrice;
                    if(action.payload.type === "INCREMENT"){
                        newAmount = +state.meals[i].amount + 1;
                        newPrice = (state.meals[i].price / state.meals[i].amount) + parseFloat(state.meals[i].price);
                        newCartSize = +state.cartSize + 1;
                    }else{
                        newAmount = state.meals[i].amount > 1 ? state.meals[i].amount - 1 : state.meals[i].amount;
                        newPrice = state.meals[i].amount > 1 ? state.meals[i].price - (Math.round(state.meals[i].price / state.meals[i].amount * 100) / 100).toFixed(2) : state.meals[i].price; 
                        newCartSize = state.meals[i].amount > 1 ? state.cartSize - 1 : state.cartSize; 
                    }  
                    newMeals.push({...state.meals[i], amount: newAmount, price: (Math.round(newPrice * 100) / 100).toFixed(2)});
                }
            }
            return{
                ...state,
                meals: newMeals,
                cartSize: newCartSize
            };
        case ACTIONS.CHANGE_NOTES:
            for(let i = 0; i < state.meals.length; i++){
                if(i !== action.payload.index){
                    newMeals.push(state.meals[i]);
                }else{
                    newMeals.push({...state.meals[i], notes: action.payload.notes});
                }
            }
            return {
                ...state,
                meals: newMeals
            }
        case ACTIONS.MINIMUM_DELIVERY_CHECK:
            return {
                ...state,
                minimumDeliveryConflicts: action.payload
            };
        case ACTIONS.SEND_ORDER:
            return {
                ...state,
                numberOfOrders: action.payload,
                waitingForResponses: true,
                loadingStatus: true
            };
        case ACTIONS.ORDER_ACCEPTED:
            return {
                ...state,
                waitingForResponses: state.ordersResponses.length + 1 === state.numberOfOrders ? false : true,
                loadingStatus: state.ordersResponses.length + 1 === state.numberOfOrders ? false : true,
                ordersResponses: [...state.ordersResponses, {restaurantName: action.payload.restaurantName, estimatedTime: action.payload.estimatedTime}],
            };
        case ACTIONS.ORDER_REJECTED:
            return {
                ...state,
                waitingForResponses: state.ordersResponses.length + 1 === state.numberOfOrders ? false : true,
                loadingStatus: state.ordersResponses.length + 1 === state.numberOfOrders ? false : true,
                ordersResponses: [...state.ordersResponses, {restaurantName: action.payload.restaurantName, rejectReason: action.payload.rejectReason}],
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};