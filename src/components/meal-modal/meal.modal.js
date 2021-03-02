import './meal.modal.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';
import { CURRENCY } from '../../util/consts';
import AddOns from './add-ons';
import MessageDanger from '../message-danger';
import InputError from '../input-error';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {currentAddress} = useSelector(state => state.feed);
    const [addOns, setAddOns] = useState([]);
    const [showAddons, setShowAddons] = useState(false);
    const [oldSelectPrice, setOldSelectPrice] = useState(0);
    const [singleItemPrice, setSingleItemPrice] = useState(props.meal.price);
    const [totalPrice, setTotalPrice] = useState(props.meal.price);

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const handleAddToCart = (data) => {
        dispatch(addToCart({
            meal:{
                mealName: props.meal.mealName, 
                photo: props.meal.photo, 
                price: totalPrice, 
                amount: data.amount, 
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
        setTotalPrice(singleItemPrice * event.target.value);
    };

    const incrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            input.stepUp();
        }
        setTotalPrice(totalPrice + singleItemPrice);
    };

    const decrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input && input.value > 1){
            input.stepDown();
            setTotalPrice(totalPrice - singleItemPrice);
        }
    };

    const addRequiredModifier = (event) => {
        const input = document.getElementsByName('amount')[0];
        if(!input) return;
        setSingleItemPrice(singleItemPrice + +event.target.value - +oldSelectPrice);
        setTotalPrice(totalPrice + input.value * event.target.value - input.value * oldSelectPrice);
        setOldSelectPrice(event.target.value);
    };

    const addAddOn = (event) => {
        const input = document.getElementsByName('amount')[0];
        if(!input) return;
        if(event.target.checked){
            setTotalPrice(totalPrice + input.value * event.target.value);
            setSingleItemPrice(singleItemPrice + +event.target.value);
        }else{
            setTotalPrice(totalPrice - input.value * event.target.value);
            setSingleItemPrice(singleItemPrice - +event.target.value);
        }
    };

    return (
        <div className="modal">
            <div className="modal-underlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container-double" style={{opacity:modalOpacity}}>
                <div className="modal-header">
                    <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
                </div>
                <div className="modal-body-1">
                    <img src={props.meal.photo} alt="Loading..." className="meal-modal-photo"/>
                </div>
                <div className="modal-body-2">
                    <div className="label-accent-color">{props.meal.mealName}</div>
                    <div className="label">{props.meal.description}</div>
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
                    <form onSubmit={handleSubmit(handleAddToCart)}>
                        <div className="label">Amount</div>
                        <div className="meal-modal-amount-row">
                            <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})} onChange={changeAmount}/>
                            <i className="fas fa-minus fa-2x" onClick={decrementAmmount}></i>
                            <i className="fas fa-plus fa-2x" onClick={incrementAmmount}></i>
                            {errors.amount && <InputError text={'Amount is required'}/>}
                        </div>
                        {props.meal.modifier_required && 
                        <React.Fragment>
                            <div className="label">Choose {props.meal.modifier_required.name}</div>
                            <select onChange={addRequiredModifier}>
                                {Object.keys(props.meal.modifier_required.values).map(key =>
                                    <option value={props.meal.modifier_required.values[key]} key={key}>
                                        {key} {props.meal.modifier_required.values[key] === 0 ? '' :
                                        '+'+props.meal.modifier_required.values[key] + CURRENCY}
                                    </option>)}
                            </select>
                        </React.Fragment>
                        }
                        {props.meal.modifier_optional && 
                        <div className="label">Add ons
                            <button type="button" onClick={() => setShowAddons(!showAddons)} className="button-small">{showAddons ? 'Close' : 'Choose'}</button>
                        </div>
                        }
                        {showAddons && <AddOns addOns={props.meal.modifier_optional} addAddOn={addAddOn}/>}
                        <div className="label">Notes (optional)</div>
                        <textarea name="notes" ref={register({maxLength: 200})}/>
                        {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}

                        <button type="submit" className="button-long">{(Math.round(totalPrice * 100) / 100).toFixed(2) + CURRENCY} Add to cart</button>
                    </form>
                :
                <button className="button-long">Get directions</button>
                }
                </div>
            </div>
            
        </div>
    );
};