import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../common/actions/cart.actions';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const handleAddToCart = (data) => {
        dispatch(addToCart({amount:data.amount, notes:data.notes, 
            restaurantName:props.meal.restaurantName, mealName:props.meal.mealName, price:props.meal.price, photo:props.meal.photo, restaurantId:props.meal.restaurantId, deliveryMinimum:props.meal["delivery-minimum"]}));
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
                        Restaurant: {props.meal.restaurantName}
                    </div>
                    <div className="label-accent-color">
                        Location: {props.meal.location}
                    </div>
                    {!props.meal.delivery &&
                    <div className="label-accent-color">
                        Phone: {props.meal.phone}
                    </div>
                    }
                </div>
                
                {props.meal.delivery ? 
                <div className="modal-body">
                    <form onSubmit={handleSubmit(handleAddToCart)}>
                        <div className="label-accent-color">Amount</div>
                        <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})}/>
                        {errors.amount && <p className="message-danger">Amount is required</p>}
                        <div className="label-accent-color">Notes (optional)</div>
                        <textarea name="notes" ref={register({maxLength: 200})}/>
                        {errors.notes && <p className="message-danger">Notes are limited to 200 characters</p>}
                        <button type="submit" className="button-long">Add to cart</button>
                    </form>
                </div>
                :
                <button className="button-long">Get directions</button>
                }
            </div>
        </div>
    );
};