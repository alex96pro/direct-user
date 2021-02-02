import './sign-up.page.scss';
import { useForm } from 'react-hook-form';
import { signUpAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../../components/nav-bar/nav-bar';
import SubmitButton from '../../components/common/submit-button';
import InputError from '../../components/common/input-error';
import GoogleAutocomplete from '../../components/common/google-autocomplete';

export default function SignUp() {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const [message, setMessage] = useState({text: '', success: false});
    const {loadingStatus} = useSelector(state => state.authentication);
    const history = useHistory();

    const setNewMessage = (newMessage, newSuccess = false) => {
        setMessage({text: newMessage, success: newSuccess});
    };
    
    const signUp = (data) => {
        if(data.password !== data.retypePassword){
            setMessage({text: "Passwords don't match", success: false});
        }else{
            const position = JSON.parse(localStorage.getItem('POSITION'));
            const address = localStorage.getItem('ADDRESS');
            dispatch(signUpAPI({...data, address, lat: position.lat, lon: position.lon}, setNewMessage));
        }
    };

    return (
        <div className="sign-up">
            <NavBar loggedIn={false}/>
            {!message.success && 
            <div className="sign-up-container">
                <div className="form-container">
                <div className="sign-up-header">Create your new account</div>
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="label-accent-color">Email</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <InputError text={'Email is required'}/>}

                        <div className="label-accent-color">Delivery address</div>
                        <GoogleAutocomplete placeholder='Your address'/>
                        {errors.deliveryAddress && <InputError text={'Delivery address is required'}/>}

                        <div className="label-accent-color">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <InputError text={'Password is required'}/>}
                        <div className="label-accent-color">Retype password</div>
                        <input type="password" name="retypePassword" ref={register({required:true})}/>
                        {errors.retypePassword && <InputError text={'Retype password'}/>}
                        <SubmitButton loadingStatus={loadingStatus} text="Sign Up"/>
                    </form>
                {message.text && <p className="message-danger">{message.text}</p>}
                </div>
                <p className="label-accent-color">Already have an account?<button type="button" onClick={() => history.push('/login')} className="button-link">Log in</button></p>
            </div>}
            {message.text && message.success && <p className="label-accent-color">{message.text}</p>}
        </div>
    );
};