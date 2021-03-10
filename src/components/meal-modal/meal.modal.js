import './meal.modal.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';
import { CURRENCY } from '../../util/consts';
import Modifiers from '../modifiers/modifiers';
import MessageDanger from '../message-danger';
import InputError from '../input-error';

export default function MealModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {currentAddress} = useSelector(state => state.feed);
    const [amount, setAmount] = useState(1);
    const [mealBasePrice, setMealBasePrice] = useState(props.meal.price);
    const [requiredModifiers, setRequiredModifiers] = useState([]);
    const [optionalModifiersPrice, setOptionalModifiersPrice] = useState(0);

    useEffect(() => {
        document.querySelector("body").style.overflow = 'hidden'; //prevent rest of the page from scrolling
        return () => {
            document.querySelector("body").style.overflow = 'visible';
        };
    }, []);

    const handleAddToCart = (data) => {
        dispatch(addToCart({
            meal:{
                mealName: props.meal.mealName,
                description: props.meal.description, 
                photo: props.meal.photo,
                totalPrice: (Math.round((mealBasePrice + optionalModifiersPrice + requiredModifiers.reduce((sum, item) => sum += +item.price, 0)) * amount * 100) / 100).toFixed(2),
                amount: amount, 
                notes: data.notes,
                restaurantId: props.meal.restaurantId || props.restaurant.restaurantId, 
                restaurantName: props.meal.restaurantName || props.restaurant.restaurantName, 
                deliveryMinimum: props.meal["delivery-minimum"] || props.restaurant.deliveryMinimum
            }, 
            deliveryAddress: currentAddress
        }));
        props.closeModal();
        infoToast('Added to cart');
    };

    const changeAmount = (event) => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            setAmount(+input.value);
        }
    };

    const incrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            input.value = +input.value + 1;
            setAmount(amount + 1);
        }
    };

    const decrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input && input.value > 1){
            input.value = input.value - 1;
            setAmount(amount - 1);
        }
    };

    const addRequiredBaseModifier = (modifier, optionPrice) => {
        setMealBasePrice(+optionPrice);
    };

    const addRequiredModifier = (modifier, optionPrice) => {
        let newRequiredModifiers = requiredModifiers.filter(modifierItem => modifierItem.modifier.modifierId !== modifier.modifierId);
        newRequiredModifiers.push({modifier: modifier, price: optionPrice});
        setRequiredModifiers(newRequiredModifiers);
    };

    const addOptionalModifier = (event, modifier, optionPrice) => {
        if(event.target.checked){
            setOptionalModifiersPrice(optionalModifiersPrice + +optionPrice);
        }else{
            setOptionalModifiersPrice(optionalModifiersPrice - optionPrice);
        }
    }

    return (
        <React.Fragment>
        <div className="modal-underlay" onClick={() => props.closeModal()}></div>
        <div className="modal" style={{opacity:1}}>
        <form onSubmit={handleSubmit(handleAddToCart)}>
            <div className="modal-header">
                <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
            </div>
            <div className="modal-body-horizontal">
                <div className="meal-modal-photo-container">
                    <img src={props.meal.photo} alt="Loading..." className="meal-modal-photo"/>
                </div>
                <div className="meal-modal-basic-info">
                    <div className="label-accent-color">{props.meal.mealName}</div>
                    <div className="label pt-15">{props.meal.description}</div>
                    {props.feed &&
                    <div>
                        <div className="label-accent-color-2">{props.meal.restaurantName}</div>
                        {!props.meal.delivery &&
                        <React.Fragment>
                            <div className="label">{props.meal.location}</div>
                            <div className="label">{props.meal.phone}</div>
                        </React.Fragment>}
                    </div>
                    }
                    {props.meal.delivery || (props.restaurant && props.restaurant.delivery) ? //feed || menu
                        currentAddress.address === 'Current location' ?
                        <MessageDanger text='Delivery is disabled when using current location'/>
                        :
                        <React.Fragment>
                            <div className="label pt-15">Amount</div>
                            <div className="meal-modal-amount-row">
                                <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})} onChange={changeAmount} className="app-input-number"/>
                                <i className="fas fa-minus fa-2x" onClick={decrementAmmount}></i>
                                <i className="fas fa-plus fa-2x" onClick={incrementAmmount}></i>
                                {errors.amount && <InputError text={'Amount is required'}/>}
                            </div>
                            <div className="label pt-15">Notes (optional)</div>
                            <textarea name="notes" ref={register({maxLength: 200})} className="app-textarea"/>
                            {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}
                        </React.Fragment>
                        :
                        <button className="button-long">Get directions</button>
                        }
                </div>
                <Modifiers addOptionalModifier={addOptionalModifier} addRequiredModifier={addRequiredModifier} addRequiredBaseModifier={addRequiredBaseModifier}/>
            </div>
            <div className="modal-footer">
                <button type="submit" className="button-long button-add-to-cart">
                    {(Math.round((mealBasePrice + optionalModifiersPrice + requiredModifiers.reduce((sum, item) => sum += +item.price, 0)) * amount * 100) / 100).toFixed(2) + CURRENCY} &nbsp;&nbsp; 
                    Add to cart
                </button>
            </div>
            </form>
        </div>
        </React.Fragment>
    );
};