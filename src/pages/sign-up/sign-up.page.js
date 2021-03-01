import './sign-up.page.scss';
import { useForm } from 'react-hook-form';
import { signUpAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../components/nav-bar/nav-bar';
import SubmitButton from '../../components/submit-button';
import InputError from '../../components/input-error';
import GoogleAutocomplete from '../../components/google-autocomplete';

export default function SignUp() {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const [message, setMessage] = useState({text: '', success: false});
    const [messagePasswords, setMessagePasswords] = useState('');
    const {loadingStatus} = useSelector(state => state.authentication);
    const history = useHistory();

    const setNewMessage = (newMessage, newSuccess = false) => {
        setMessage({text: newMessage, success: newSuccess});
    };
    
    const signUp = (data) => {
        if(data.password !== data.retypePassword){
            setMessagePasswords("Passwords don't match");
        }else{
            setMessagePasswords("");
            const position = JSON.parse(localStorage.getItem('POSITION'));
            const address = localStorage.getItem('ADDRESS');
            dispatch(signUpAPI({...data, address, lat: position.lat, lon: position.lon}, setNewMessage));
        }
    };

    useEffect(() => {
        if(localStorage.getItem('ACCESS_TOKEN')){
            history.push('/feed');
        }
    }, [history]);

    return (
        <div className="sign-up">
            <NavBar loggedIn={false}/>
            {!message.success && 
            <div className="sign-up-container">
                <div className="form-container">
                <div className="sign-up-header">Create your new account</div>
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="label">Email</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <InputError text={'Email is required'}/>}
                        {message.text && <InputError text={message.text}/>}

                        <div className="label">Delivery address</div>
                        <GoogleAutocomplete/>
                        
                        {errors.deliveryAddress && <InputError text={'Delivery address is required'}/>}

                        <div className="label">Floor / Apartment / Other</div>
                        <input type="text" name="description" ref={register({required:true})}/>
                        {errors.description && <InputError text={'This field is required'}/>}

                        <div className="label">Phone</div>
                        <input type="text" name="phone" ref={register({required:true, pattern: /^\d+$/})}/>
                        {errors.phone && errors.phone.type === "required" && <InputError text={'Phone is required'}/>}
                        {errors.phone && errors.phone.type === "pattern" && <InputError text={'Phone can contain numbers only'}/>}

                        <div className="label">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <InputError text={'Password is required'}/>}
                        {messagePasswords && <InputError text={messagePasswords}/>}

                        <div className="label">Retype password</div>
                        <input type="password" name="retypePassword" ref={register({required:true})}/>
                        {errors.retypePassword && <InputError text={'Retype password'}/>}
                        {messagePasswords && <InputError text={messagePasswords}/>}

                        <SubmitButton loadingStatus={loadingStatus} text="Sign Up"/>
                    </form>
                </div>
                <p className="label">Already have an account?<button type="button" onClick={() => history.push('/login')} className="button-link">Log in</button></p>
            </div>}
            {message.text && message.success && <div className="header-accent-color-2">{message.text}</div>}
        </div>
    );
};