import './edit-meal.modal.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';
import { CURRENCY } from '../../util/consts';
import Modifiers from '../../components/modifiers/modifiers';
import MessageDanger from '../../components/message-danger';
import InputError from '../../components/input-error';

export default function EditMealModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {currentAddress} = useSelector(state => state.feed);
    // const [addOns, setAddOns] = useState([]);
    // const [oldSelectPrice, setOldSelectPrice] = useState(0);
    const [singleItemPrice, setSingleItemPrice] = useState(props.meal.price);
    const [totalPrice, setTotalPrice] = useState(props.meal.price);

    useEffect(() => {
        document.querySelector("body").style.overflow = 'hidden'; //prevent rest of the page from scrolling
        return () => {
            document.querySelector("body").style.overflow = 'visible';
        };
    }, []);

    const submitMeal = (data) => {
        // dispatch(addToCart({
        //     meal:{
        //         mealName: props.meal.mealName, 
        //         photo: props.meal.photo,
        //         singleItemPrice: (Math.round(singleItemPrice * 100) / 100).toFixed(2), 
        //         totalPrice: (Math.round(totalPrice * 100) / 100).toFixed(2), 
        //         amount: data.amount, 
        //         notes: data.notes,
        //         modifiers: modifiers,
        //         restaurantId: props.meal.restaurantId || props.restaurant.restaurantId, 
        //         restaurantName: props.meal.restaurantName || props.restaurant.restaurantName, 
        //         deliveryMinimum: props.meal["delivery-minimum"] || props.restaurant.deliveryMinimum
        //     }, 
        //     deliveryAddress: currentAddress
        // }));
        // props.closeModal();
        // infoToast('Added to cart');
    };

    const changeAmount = (event) => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            console.log(input.value);
            setTotalPrice(singleItemPrice * input.value);
        }
    };

    const incrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            input.value = +input.value + 1;
            setTotalPrice(totalPrice + singleItemPrice);
        }
    };

    const decrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input && input.value > 1){
            input.value = input.value - 1;
            setTotalPrice(totalPrice - singleItemPrice);
        }
    };

    const addRequiredModifier = (event) => {
        // const input = document.getElementsByName('amount')[0];
        // if(!input) return;
        // setSingleItemPrice(singleItemPrice + +event.target.value - +oldSelectPrice);
        // setTotalPrice(totalPrice + input.value * event.target.value - input.value * oldSelectPrice);
        // setOldSelectPrice(event.target.value);
    };

    const addAddOn = (event) => {
        const input = document.getElementsByName('amount')[0];
        if(!input) return;
        if(event.target.checked){
            setTotalPrice(totalPrice + input.value * event.target.value);
            setSingleItemPrice(singleItemPrice + +event.target.value);
        }else{
            setTotalPrice(totalPrice - input.value * event.target.value);
            setSingleItemPrice(singleItemPrice - event.target.value);
        }
    };

    return (
        <React.Fragment>
        <div className="modal-underlay" onClick={() => props.closeModal()}></div>
        <div className="modal" style={{opacity:1}}>
        <form onSubmit={handleSubmit(submitMeal)}>
            <div className="modal-header">
                <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
            </div>
            <div className="modal-body-horizontal" style={{opacity:1}}>
                
                <div className="meal-modal-photo-container">
                    <img src={props.meal.photo} alt="Loading..." className="meal-modal-photo"/>
                </div>
                <div className="meal-modal-basic-info">
                    <div className="label-accent-color">{props.meal.mealName}</div>
                    <div className="label">{props.meal.description}</div>
                    <div className="label">Amount</div>
                    <div className="meal-modal-amount-row">
                        <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})} onChange={changeAmount} className="app-input-number"/>
                        <i className="fas fa-minus fa-2x" onClick={decrementAmmount}></i>
                        <i className="fas fa-plus fa-2x" onClick={incrementAmmount}></i>
                        {errors.amount && <InputError text={'Amount is required'}/>}
                    </div>
                    <div className="label">Notes (optional)</div>
                    <textarea name="notes" ref={register({maxLength: 200})} className="app-textarea"/>
                    {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}
                </div>
                <div className="meal-modal-modifiers"><Modifiers addAddOn={addAddOn} addRequiredModifier={addRequiredModifier} modifiers={props.meal.modifiers}/></div>
            </div>
            <div className="modal-footer">
                <button type="submit" className="button-long button-add-to-cart">{(Math.round(totalPrice * 100) / 100).toFixed(2) + CURRENCY}Save changes</button>
            </div>
            </form>
        </div>
        </React.Fragment>
    );
};