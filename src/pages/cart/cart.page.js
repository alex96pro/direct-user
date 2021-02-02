import './cart.page.scss';
import { useSelector, useDispatch } from 'react-redux';
import {CURRENCY} from '../../util/consts';
import NavBar from '../../components/nav-bar/nav-bar';
import { useHistory } from 'react-router-dom';
import { changeAmount, removeFromCart, minimumDeliveryCheck } from '../../common/actions/cart.actions';
import { useState, useEffect } from 'react';
import {checkDeliveryMinimumsForCart} from '../../util/functions';

export default function Cart() {

    const dispatch = useDispatch();
    const {meals, minimumDeliveryConflicts, deliveryAddress} = useSelector(state => state.cart);
    const history = useHistory();
    const [notesAccordion, setNotesAccordion] = useState({notes:'', show:false, top:0, left:0});

    const removeMealFromCart = (index) => {
        setNotesAccordion({...notesAccordion, show:false});
        dispatch(removeFromCart(index));
    };

    const handleChangeAmount = (event, index) => {
        dispatch(changeAmount({newAmount: event.target.value, index: index}));
    };

    const reduceMealOpacity = (index) => {
        document.getElementsByClassName('cart-meal')[index].style.opacity = 0.7;
    };
    const increaseMealOpacity = (index) => {
        document.getElementsByClassName('cart-meal')[index].style.opacity = 1;
    };

    const showNotesAccordion = (index) => {
        let element = document.getElementsByClassName('cart-meal')[index];
        if(element){
            let top = (element.getClientRects()[0].top);
            let height = element.offsetHeight;
            let left = (element.getClientRects()[0].left);
            setNotesAccordion({notes:meals[index].notes, show:true, top: top + height, left:left});
        }
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
            {meals.length !== 0 && <div className="header-accent-color">Your cart</div>}
            {meals.length !== 0 ?
                <div className="cart-container">
                {meals.map((meal, index) =>
                    <div className="cart-meal" key={index}>
                        <div className="cart-meal-header">
                            {meal.mealName}
                            <button onClick={() => removeMealFromCart(index)} className="cart-meal-x" 
                            onMouseEnter={() => reduceMealOpacity(index)}
                            onMouseLeave={() => increaseMealOpacity(index)}>
                            x
                            </button>
                        </div>

                        <img src={meal.photo} alt="meal" className="cart-meal-photo"/>

                        <div className="cart-restaurant-name" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>
                            {meal.restaurantName}
                        </div>
                        <div className="label-white">
                            {(Math.round(meal.price * meal.amount * 100) / 100).toFixed(2)}{CURRENCY}
                        </div>
                        <div className="label-white">
                            <label className="label-white">Amount</label>
                            <input type="number" min="1" value={meal.amount} onChange={(event) => handleChangeAmount(event, index)}/>
                        </div>
                        <div>
                            {meal.notes && <button onClick={() => showNotesAccordion(index)} className="cart-notes-button">See notes</button>}
                        </div>
                    </div>
                )}
                    {notesAccordion.show && 
                    <div className="cart-notes-accordion" style={{top:notesAccordion.top, left:notesAccordion.left}}>
                        <button onClick={() => setNotesAccordion({...notesAccordion, show:false})} className="cart-meal-x">x</button>
                        <div className="label-accent-color">{notesAccordion.notes}</div>
                    </div>}
                </div>
                :
                <div className="cart-no-meals">
                    <p className="header-accent-color">You don't have any meals in your cart</p>
                    <button onClick={() => history.push('/feed')} className="button-normal">Go back to feed</button>
                </div>
            }
            {minimumDeliveryConflicts.length > 0 && 
            <div className="wrapper-container">
                {minimumDeliveryConflicts.map((conflict, index) => 
                <div className="message-danger" key={index}>
                    {`Minimum delivery for restaurant "${conflict.restaurantName}" is ${conflict.deliveryMinimum}${CURRENCY}`}
                </div>
            )}
            </div>}
            
            {meals.length !== 0 && 
                <div className="cart-total">
                    {deliveryAddress && <p className="label-accent-color">Delivery address: {deliveryAddress}</p>}
                    <div className="header-accent-color-2">
                        Total: {(Math.round(meals.reduce((sum, current) => sum + current.price * current.amount, 0)*100) / 100).toFixed(2)}{CURRENCY}
                        </div>
                    <button className={minimumDeliveryConflicts.length > 0 ? "button-normal-disabled" : "button-normal"}>Proceed to checkout</button>
                </div>
            }
        </div>
    );
};