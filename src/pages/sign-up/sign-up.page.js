import './sign-up.page.scss';
import { useForm } from 'react-hook-form';
import { signUpAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../components/nav-bar/nav-bar';
import SubmitButton from '../../components/common/submit-button';
import MessageDanger from '../../components/common/message-danger';

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
            dispatch(signUpAPI({...data, lat: position.lat, lon: position.lon}, setNewMessage));
        }
    };

    useEffect(() => {
        const googleMapsScript = document.getElementById('google-maps-script');
        if(!googleMapsScript){
            const script1 = document.createElement('script');
            script1.src = "./initMap.js";
            document.body.appendChild(script1);
            script1.onload = () => {
                const script2 = document.createElement('script');
                script2.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`;
                //script2.async = 'async';
                //script2.defer = 'defer';
                script2.id = 'google-maps-script';
                document.body.appendChild(script2);
            }
        }else{
            history.go(0);
        }
        // eslint-disable-next-line
    }, []);

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
                        {errors.email && <MessageDanger text='Email is required'/>}

                        <div className="label-accent-color">Delivery address</div>
                        <input type="text" name="address" id="search-google-maps" ref={register({required:true})} placeholder="Your adress"/>
                        {errors.address && <MessageDanger text='Address is required'/>}

                        <div className="label-accent-color">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <MessageDanger text='Password is required'/>}
                        <div className="label-accent-color">Retype password</div>
                        <input type="password" name="retypePassword" ref={register({required:true})}/>
                        {errors.retypePassword && <MessageDanger text='Retype password'/>}
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