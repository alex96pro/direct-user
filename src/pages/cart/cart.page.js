import './cart.page.scss';
import { useSelector, useDispatch } from 'react-redux';
import {CURRENCY} from '../../util/consts';
import { useHistory } from 'react-router-dom';
import { minimumDeliveryCheck, changeAmount } from '../../common/actions/cart.actions';
import React, { useState, useEffect } from 'react';
import {checkDeliveryMinimumsForCart} from '../../util/functions';
import NavBar from '../../components/nav-bar/nav-bar';
import EditNotesModal from './edit-notes.modal';
import RemoveMealModal from './remove-meal.modal';

export default function Cart() {

    const dispatch = useDispatch();
    const {meals, minimumDeliveryConflicts, deliveryAddress} = useSelector(state => state.cart);
    const [removeMealModal, setRemoveMealModal] = useState({show: false, mealName: '', index: ''});
    const [editNotesModal, setEditNotesModal] = useState({show: false, meal:{}});
    const history = useHistory();

    const reduceMealOpacity = (index) => {
        document.getElementsByClassName('cart-meal')[index].style.opacity = 0.7;
    };

    const increaseMealOpacity = (index) => {
        document.getElementsByClassName('cart-meal')[index].style.opacity = 1;
    };

    const checkDeliveryMinimums = () => {
        let deliveryMinimumsConflicts = checkDeliveryMinimumsForCart(meals);
        dispatch(minimumDeliveryCheck(deliveryMinimumsConflicts));
    };

    const incrementOrDecrementAmount = (index, type) => {
        dispatch(changeAmount({index: index, type: type}));
    };

    const sendOrder = () => {
        history.push('/order');
    };

    useEffect(() => {
        checkDeliveryMinimums();
        // eslint-disable-next-line
    }, [meals]);
    
    useEffect(() => {
        window.scroll(0,0);
    },[]);

    return(
        <div className="cart">
            <NavBar loggedIn={true}/>
            {meals.length !== 0 ?
            <React.Fragment>
                <div className="header-accent-color">Your cart</div>
                {minimumDeliveryConflicts.length > 0 && 
                <div>
                    {minimumDeliveryConflicts.map((conflict, index) => 
                    <div className="message-danger" key={index}>
                        {`Minimum delivery for restaurant "${conflict.restaurantName}" is ${conflict.deliveryMinimum}${CURRENCY}`}
                    </div>
                    )}
                </div>}
                <div className="cart-meals-container">
                    {meals.map((meal,index) =>
                    <div className="cart-meal" key={index}>
                        <img src={meal.photo} alt="meal" className="cart-meal-photo"/>
                        <div>
                            <div className="label-accent-color-2">{meal.mealName}</div>

                            <label className="label-accent-color-2">Amount: {meal.amount}</label>

                            <i className="fas fa-minus fa-2x" onClick={() => incrementOrDecrementAmount(index, "DECREMENT")}></i>
                            <i className="fas fa-plus fa-2x" onClick={() => incrementOrDecrementAmount(index, "INCREMENT")}></i>
                            
                            <div className="label-accent-color-2">{(Math.round(meal.price * meal.amount * 100) / 100).toFixed(2)}{CURRENCY}</div>
                            
                            <div className="cart-notes" onClick={() => setEditNotesModal({show: true, meal:{name:meal.mealName, notes: meal.notes, index: index, }})}>Notes
                            <i className="fas fa-edit fa-1x"></i>
                            </div>
                            
                            <div className="cart-restaurant-name" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>{meal.restaurantName}</div>
                            
                            <i className="fas fa-trash fa-2x" onMouseEnter={() => reduceMealOpacity(index)}
                                onMouseLeave={() => increaseMealOpacity(index)} onClick={() => setRemoveMealModal({show:true, mealName:meal.mealName, index: index})}></i>
                        </div>
                    </div>)}
                </div>
                <div className="cart-total">
                    <div>
                        <i className="fas fa-house-user fa-3x"></i>
                        <label className="label-accent-color-2">{deliveryAddress.address}</label>
                    </div>
                    <div className="cart-total-label">
                        Total: {(Math.round(meals.reduce((sum, current) => sum + current.price * current.amount, 0)*100) / 100).toFixed(2)}{CURRENCY}
                    </div>
                    <button onClick={sendOrder} className={minimumDeliveryConflicts.length > 0 ? "button-normal-disabled" : "button-normal cart-checkout-button"}>Proceed to checkout</button>
                </div>
            </React.Fragment>
            :
            <div className="cart-no-meals">
                <p className="header-accent-color" >You don't have any meals in your cart</p>
                <button onClick={() => history.push('/feed')} className="button-normal">Go back to feed</button>
            </div>
            }
            {removeMealModal.show && <RemoveMealModal meal={removeMealModal} closeModal={() => setRemoveMealModal({...removeMealModal, show: false})}/>}
            {editNotesModal.show && <EditNotesModal meal={editNotesModal.meal} closeModal={() => setEditNotesModal({...editNotesModal, show: false})}/>}
        </div>
    );
};