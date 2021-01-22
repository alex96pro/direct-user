import './sign-up-restaurant.page.scss';
import { useForm } from 'react-hook-form';
import NavBar from '../../components/nav-bar/nav-bar';
import { CURRENCY, DISTANCE } from '../../util/consts';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpRestaurant() {

    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();
    const [deliveryChecked, setDeliveryChecked] = useState(false);

    const handleNextStep = (data) => {
        localStorage.setItem('RESTAURANT', JSON.stringify(data));
    }
    const changeDeliveryField = (event) => {
        if(event.target.checked){
            setDeliveryChecked(true);
        }else{
            setDeliveryChecked(false);
        }
    }
    return(
        <div className="sign-up-restaurant">
            <NavBar loggedIn={false}/>
            <div className="sign-up-restaurant-container">
                <div className="form-container">
                <div className="sign-up-restaurant-header">Create account for your restaurant</div>
                    <form onSubmit={handleSubmit(handleNextStep)}>
                        <div className="label-accent-color">Restaurant Name</div>
                        <input type="text" name="restaurantName" ref={register({required:true})}/>
                        {errors.restaurantName && <div className="message-danger">Restaurant Name is required</div>}

                        <div className="label-accent-color">Email</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <div className="message-danger">Email is required</div>}

                        <div className="label-accent-color">Phone</div>
                        <input type="text" name="phone" ref={register({required:true})}/>
                        {errors.phone && <div className="message-danger">Phone is required</div>}

                        <div className="restaurant-delivery-checkbox">Delivery
                        <input type="checkbox" name="delivery" ref={register()} value={deliveryChecked} onChange={changeDeliveryField}/></div>

                        <div className="label-accent-color">Delivery range</div>
                        <input type="number" name="deliveryRange" ref={register()} step="0.1" disabled={!deliveryChecked}/>
                        <label className="label-accent-color">{DISTANCE}</label>

                        <div className="label-accent-color">Delivery minimum</div>
                        <input type="number" name="deliveryMinimum" ref={register()} step="0.01" disabled={!deliveryChecked}/>
                        <label className="label-accent-color">{CURRENCY}</label>

                        <div className="label-accent-color">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <div className="message-danger">Password is required</div>}

                        <div className="label-accent-color">Retype password</div><input type="password" name="retypePassword" ref={register({required:true})}/>
                        {errors.retypePassword && <div className="message-danger">Retype password</div>}

                        <button type="submit" className="button-long">Next</button>
                    </form>
                </div>
                <div className="label-accent-color">Already have an account?
                <button type="button" onClick={() => history.push('/login-restaurant')} className="button-link">Log In</button></div>
            </div>
            
        </div>
    );
};