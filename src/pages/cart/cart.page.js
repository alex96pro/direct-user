import './cart.page.scss';
import { useSelector, useDispatch } from 'react-redux';
import socketClient from 'socket.io-client';
import {CURRENCY, MAXIMUM_RESTAURANTS_FOR_ORDER} from '../../util/consts';
import { useHistory } from 'react-router-dom';
import { minimumDeliveryCheck, changeAmount, sendOrder, orderAccepted, orderRejected } from '../../common/actions/cart.actions';
import React, { useState, useEffect } from 'react';
import {checkDeliveryMinimumsForCart} from '../../util/functions';
import { BACKEND_API } from '../../util/consts';
import { getClientTime } from '../../util/functions';
import NavBar from '../../components/nav-bar/nav-bar';
import MessageDanger from '../../components/message-danger';
import ConfirmButton from '../../components/confirm-button';
import EditNotesModal from './edit-notes.modal';
import RemoveMealModal from './remove-meal.modal';
var socket;

export default function Cart() {

    const dispatch = useDispatch();
    const {meals, minimumDeliveryConflicts, deliveryAddress, waitingForResponses, numberOfOrders, ordersResponses, loadingStatus} = useSelector(state => state.cart);
    const { phone } = useSelector(state => state.authentication);
    const [removeMealModal, setRemoveMealModal] = useState({show: false, mealName: '', index: ''});
    const [editNotesModal, setEditNotesModal] = useState({show: false, meal:{}});
    const [message, setMessage] = useState('');
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

    useEffect(() => {
        if(!localStorage.getItem('ACCESS_TOKEN')){
            history.push('/login');
            return;
        }
        window.scroll(0,0);
        socket = socketClient (BACKEND_API);
        socket.on('connection', () => {
            socket.emit('send-id',{userId: localStorage.getItem('USER_ID')});
        });
        socket.on('order-accepted', (args) => {
            dispatch(orderAccepted(args));
        });
        socket.on('order-rejected', (args) => {
            dispatch(orderRejected(args));
        });
    }, [dispatch, history]);

    const handleSendOrder = () => {
        let restaurantIds = meals.map(meal => meal.restaurantId);
        let uniqueRestaurantIds = [...new Set(restaurantIds)];
        if(uniqueRestaurantIds.length > MAXIMUM_RESTAURANTS_FOR_ORDER){
            setMessage(`You can order only from ${MAXIMUM_RESTAURANTS_FOR_ORDER} maximum`);
            return;
        }
        setMessage('');
        let orders = [];
        dispatch(sendOrder(uniqueRestaurantIds.length)); // number of unique orders
        for(let i = 0; i < uniqueRestaurantIds.length; i++){
            orders.push({restaurantId: uniqueRestaurantIds[i], deliveryAddress: deliveryAddress.address + ' ('+deliveryAddress.description+')', phone: phone, total: 0, meals:[]});
            for(let j = 0; j < meals.length; j++){
                if(meals[j].restaurantId === uniqueRestaurantIds[i]){
                    orders[i].meals.push({name: meals[j].mealName, amount: meals[j].amount, notes: meals[j].notes});
                    orders[i].total += meals[j].price * meals[j].amount;
                }
            }
            orders[i].total = (Math.round(orders[i].total * 100) / 100).toFixed(2);
        }
        let time = getClientTime();
        for(let i = 0; i < orders.length; i++){
            socket.emit('user-send-order', {
                restaurantId: orders[i].restaurantId, 
                userId: localStorage.getItem('USER_ID'),
                meals: orders[i].meals, 
                deliveryAddress: orders[i].deliveryAddress,
                phone: phone,
                total: orders[i].total,
                time: time,
            });
        }
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
                <div className="header">Your cart</div>
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
                {waitingForResponses && <div className="cart-black-container"></div>}
                <div className="cart-total">
                    <div>
                        <i className="fas fa-house-user fa-3x"></i>
                        <label className="label-accent-color-2">{deliveryAddress.address}</label>
                    </div>
                    <div className="cart-total-label">
                        Total: {(Math.round(meals.reduce((sum, current) => sum + current.price * current.amount, 0)*100) / 100).toFixed(2)}{CURRENCY}
                    </div>
                    {(ordersResponses.length === 0 || ordersResponses.length !== numberOfOrders) ?
                        minimumDeliveryConflicts.length > 0 ?
                        <button className="button-long-disabled">Send order</button>
                        :
                        <ConfirmButton loadingStatus={loadingStatus} onClick={handleSendOrder} text='Send order'/>
                        :
                        null
                    }
                    {message && <MessageDanger text={message}/>}
                    {waitingForResponses && <label className="label">Waiting for {numberOfOrders > 1 ? 'restaurants' : 'restaurant'} response...</label>}
                    {ordersResponses.map((orderResponse, index) =>
                    orderResponse.estimatedTime ? 
                    <div className="message-success" key={index}>
                        Good news! Restaurant {orderResponse.restaurantName} accepted your order!
                        Estimated time for delivery: {orderResponse.estimatedTime}
                    </div> 
                    : 
                    <div className="message-danger" key={index}>
                        Bad news! Restaurant {orderResponse.restaurantName} rejected your order!
                        Reason: {orderResponse.rejectReason}
                    </div>
                    )}
                </div>
            </React.Fragment>
            :
            <div className="cart-no-meals">
                <p className="header" >You don't have any meals in your cart</p>
                <button onClick={() => history.push('/feed')} className="button-normal">Go back to feed</button>
            </div>
            }
            {removeMealModal.show && <RemoveMealModal meal={removeMealModal} closeModal={() => setRemoveMealModal({...removeMealModal, show: false})}/>}
            {editNotesModal.show && <EditNotesModal meal={editNotesModal.meal} closeModal={() => setEditNotesModal({...editNotesModal, show: false})}/>}
        </div>
    );
};