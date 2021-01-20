import './cart.page.scss';
import { useSelector, useDispatch } from 'react-redux';
import {CURRENCY} from '../../util/consts';
import NavBar from '../../components/nav-bar/nav-bar';
import { removeFromCart } from '../../common/actions/cart.actions';
import { useHistory } from 'react-router-dom';
import { changeAmount } from '../../common/actions/cart.actions';

export default function Cart() {

    const dispatch = useDispatch();
    const {meals} = useSelector(state => state.cart);
    const history = useHistory();

    const removeMealFromCart = (index) => {
        dispatch(removeFromCart(index));
    };

    const handleChangeAmount = (event, index) => {
        dispatch(changeAmount({newAmount: event.target.value, index: index}));
    };

    return(
        <div className="cart">
            <NavBar loggedIn={true}/>
            {meals.length !== 0 ?
                <div className="cart-container">
                {meals.map((meal, index) =>
                    <div className="cart-meal" key={index}>
                        <div className="cart-meal-header">
                            {meal.mealName}<button onClick={() => removeMealFromCart(index)} className="cart-meal-x">x</button>
                        </div>

                        <img src={meal.photo} alt="meal" className="cart-meal-photo"/>

                        <div className="label-white">
                            {(Math.round(meal.price * meal.amount * 100) / 100).toFixed(2)}{CURRENCY}
                        </div>
                        <div className="label-white">
                            <label className="label-white">Amount</label>
                            <input type="number" min="1" value={meal.amount} onChange={(event) => handleChangeAmount(event, index)}/>
                        </div>
                        <div>
                            {meal.notes && <button onClick={() => alert(meal.notes)} className="cart-notes">See notes</button>}
                        </div>
                    </div>
                )}
                </div>
                :
                <div className="cart-no-meals">
                    <p className="header-white">You don't have any meals in your cart</p>
                    <button onClick={() => history.push('/feed')} className="button-normal">Go back to feed</button>
                </div>
            }
            {meals.length !== 0 && 
                <div className="cart-total">
                    <div className="header-accent-color-2">
                        Total: {(Math.round(meals.reduce((sum, current) => sum + current.price * current.amount, 0)*100) / 100).toFixed(2)}{CURRENCY}
                        </div>
                    <button className="button-normal">Proceed to checkout</button>
                </div>
            }
        </div>
    );
};