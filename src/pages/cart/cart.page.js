import './cart.page.scss';
import { useSelector, useDispatch } from 'react-redux';
import {CURRENCY} from '../../util/consts';
import { useHistory } from 'react-router-dom';
import { minimumDeliveryCheck } from '../../common/actions/cart.actions';
import React, { useState, useEffect } from 'react';
import {checkDeliveryMinimumsForCart} from '../../util/functions';
import NavBar from '../../components/nav-bar/nav-bar';
import EditMealModal from './edit-meal.modal';
import RemoveMealModal from './remove-meal.modal';

export default function Cart() {

    const dispatch = useDispatch();
    const {meals, minimumDeliveryConflicts, deliveryAddress} = useSelector(state => state.cart);
    const [removeMealModal, setRemoveMealModal] = useState({show: false, mealName: '', index: ''});
    const [editMealModal, setEditMealModal] = useState({show: false, notes: '', index: ''});
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

    useEffect(() => {
        checkDeliveryMinimums();
        // eslint-disable-next-line
    }, [meals]);

    return(
        <div className="cart">
            <NavBar loggedIn={true}/>
            {meals.length !== 0 ?
            <React.Fragment>
                <div className="header-accent-color">Your cart</div>
                {minimumDeliveryConflicts.length > 0 && 
                    <React.Fragment>
                    <div>
                        {minimumDeliveryConflicts.map((conflict, index) => 
                        <div className="message-danger" key={index}>
                            {`Minimum delivery for restaurant "${conflict.restaurantName}" is ${conflict.deliveryMinimum}${CURRENCY}`}
                        </div>
                        )}
                    </div>
                </React.Fragment>}
                    
                    <div className="cart-container">
                    {meals.map((meal,index) =>
                    <div className="cart-meal" key={index}>
                        <img src={meal.photo} alt="meal" className="cart-meal-photo"/>
                        <div className="cart-meal-header">
                            {meal.mealName}
                        </div>
                        <div className="cart-restaurant-name" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>
                            {meal.restaurantName}
                        </div>
                        <div className="cart-amount-price-row">
                            <label className="label-white">x{meal.amount}</label>
                            <label className="label-white">{(Math.round(meal.price * meal.amount * 100) / 100).toFixed(2)}{CURRENCY}</label>
                            <div>
                            <i className="fas fa-edit fa-2x" onClick={() => setEditMealModal({show:true, notes: meal.notes, index:index})}></i>
                            <i className="fas fa-trash fa-2x" onMouseEnter={() => reduceMealOpacity(index)}
                            onMouseLeave={() => increaseMealOpacity(index)} onClick={() => setRemoveMealModal({show:true, mealName:meal.mealName, index: index})}></i>
                            </div>
                        </div>
                    </div>)}
                    </div>
                    
            </React.Fragment>
            :
            <div className="cart-no-meals">
                <p className="header-accent-color" >You don't have any meals in your cart</p>
                <button onClick={() => history.push('/feed')} className="button-normal">Go back to feed</button>
            </div>
            }
            {meals.length !== 0 && 
                <div className="cart-total">
                    {deliveryAddress && <p className="label-accent-color">Delivery address: {deliveryAddress.address}</p>}
                    <div className="header-accent-color-2">
                        Total: {(Math.round(meals.reduce((sum, current) => sum + current.price * current.amount, 0)*100) / 100).toFixed(2)}{CURRENCY}
                    </div>
                    <button className={minimumDeliveryConflicts.length > 0 ? "button-normal-disabled" : "button-normal"}>Proceed to checkout</button>
                </div>
            }
            {removeMealModal.show && <RemoveMealModal meal={removeMealModal} closeModal={() => setRemoveMealModal({...removeMealModal, show: false})}/>}
            {editMealModal.show && <EditMealModal meal={editMealModal} closeModal={() => setEditMealModal({...editMealModal, show: false})}/>}
        </div>
    );
};