import './login.page.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logInAPI } from '../../common/api/auth.api';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import ForgottenPasswordModal from './forgotten-password.modal';
import SubmitButton from '../../components/common/submit-button';
import NavBar from '../../components/nav-bar/nav-bar';

export default function Login() {

    const {register, handleSubmit, errors} = useForm();
    const {loadingStatus}  = useSelector(state => state.authentication);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const setNewMessage = (newMessage) => {
        setMessage(newMessage);
    }

    const login = (data) => {
        dispatch(logInAPI(data, loginSuccess, setNewMessage));
    };

    const loginSuccess = () => {
        history.push("/feed");
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login">
            <NavBar loggedIn={false}/>
            <div className="login-container">
                <div className="form-container">
                    <div className="login-header">Log in to your account</div>
                    <form onSubmit={handleSubmit(login)}>
                        <div className="label-accent-color">Email</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <p className="message-danger">Email is required</p>}
                        <div className="label-accent-color">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <p className="message-danger">Password is required</p>}
                        <SubmitButton loadingStatus={loadingStatus} text="Log In"/>
                    </form>
                    {message && <p className="message-danger">{message}</p>}
                    {history.location.message && <p className="message-success">{history.location.message}</p>}
                </div>
                <div><button type="button" onClick={() => setShowModal(true)} className="button-link">Forgot password?</button></div>
            </div>
            {showModal && <ForgottenPasswordModal closeModal={closeModal}/>}
        </div>
    );
};