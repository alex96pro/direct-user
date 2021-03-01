import './meal.modal.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';
import MessageDanger from '../message-danger';
import InputError from '../input-error';
import Label from '../../components/label';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {currentAddress} = useSelector(state => state.feed);

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const handleAddToCart = (data) => {
        dispatch(addToCart({
            meal:{
                mealName: props.meal.mealName, 
                photo: props.meal.photo, 
                price: props.meal.price, 
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

    const incrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            input.stepUp();
        }
    };

    const decrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input && input.value > 0){
            input.stepDown();
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
                            <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})}/>
                            <i className="fas fa-minus fa-2x" onClick={decrementAmmount}></i>
                            <i className="fas fa-plus fa-2x" onClick={incrementAmmount}></i>
                        </div>
                        {errors.amount && <InputError text={'Amount is required'}/>}
                        <div className="label">Notes (optional)</div>
                        <textarea name="notes" ref={register({maxLength: 200})}/>
                        {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}

                        <button type="submit" className="button-long">Add to cart</button>
                    </form>
                    
                :
                <button className="button-long">Get directions</button>
                }
                </div>
            </div>
        </div>
    );
};