import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';
import MessageDanger from '../common/message-danger';
import InputError from '../common/input-error';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {currentAddress} = useSelector(state => state.feed);

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const handleAddToCart = (data) => {
        if(props.restaurant){ // add to cart from menu
            dispatch(addToCart({amount:data.amount, notes:data.notes, restaurantName:props.restaurant.restaurantName, mealName:props.meal.mealName, price:props.meal.price, 
            photo:props.meal.photo, restaurantId:props.restaurant.restaurantId, deliveryMinimum:props.restaurant.deliveryMinimum, deliveryAddress: currentAddress.address}));
        }else{ //add to cart from feed
            dispatch(addToCart({amount:data.amount, notes:data.notes, restaurantName:props.meal.restaurantName, mealName:props.meal.mealName, price:props.meal.price, 
            photo:props.meal.photo, restaurantId:props.meal.restaurantId, deliveryMinimum:props.meal["delivery-minimum"], deliveryAddress: currentAddress.address}));
        }
        props.closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="modal-header">
                    <div className="label-accent-color">
                        Meal: {props.meal.mealName}
                    </div>
                    <div className="label-accent-color">
                        Description: {props.meal.description}
                    </div>
                    {props.feed &&
                    <div>
                        <div className="label-accent-color">
                        Restaurant: {props.meal.restaurantName}
                        </div>
                        <div className="label-accent-color">
                            Location: {props.meal.location}
                        </div>
                        {!props.meal.delivery &&
                        <div className="label-accent-color">
                            Phone: {props.meal.phone}
                        </div>}
                    </div>
                    }
                </div>
                {props.meal.delivery || (props.restaurant && props.restaurant.delivery) ? //feed || menu
                <div className="modal-body">
                    {currentAddress.address === 'CURRENT_LOCATION' ?
                    <MessageDanger text='Delivery is disabled when using current location'/>
                    :
                    <form onSubmit={handleSubmit(handleAddToCart)}>
                        <div className="label-accent-color">Amount</div>
                        <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})}/>
                        {errors.amount && <InputError text={'Amount is required'}/>}
                        <div className="label-accent-color">Notes (optional)</div>
                        <textarea name="notes" ref={register({maxLength: 200})}/>
                        {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}

                        <button type="submit" className="button-long">Add to cart</button>
                    </form>
                    }
                </div>
                :
                <button className="button-long">Get directions</button>
                }
            </div>
        </div>
    );
};