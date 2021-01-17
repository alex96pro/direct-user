import { useForm } from 'react-hook-form';
import './login.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import { useDispatch, useSelector } from 'react-redux';
import { logInAPI } from '../../common/api/auth.api';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import ForgottenPasswordModal from './forgotten-password.modal';
import Loader from '../../images/loader.gif';

export default function Login() {

    const {register, handleSubmit, errors} = useForm();
    const { logInMessage, loadingStatus }  = useSelector(state => state.authentication)
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const login = (data) => {
        dispatch(logInAPI(data, loginSuccess));
    }

    const loginSuccess = () => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            localStorage.setItem("LATITUDE",position.coords.latitude);
            localStorage.setItem("LONGITUDE",position.coords.longitude);
            history.push("/user");
        }, console.log);
    }

    const closeModal = () => {
        setShowModal(false);
    }

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
                        <button type="submit" className="button-long">{loadingStatus ? <img src={Loader} className="loader-small" alt="Loading..."/> : "Log in"}</button>
                    </form>
                    {logInMessage && <p className="message-danger">{logInMessage}</p>}
                    {history.location.message && <p className="message-success">{history.location.message}</p>}
                </div>
                <div><button type="button" onClick={() => setShowModal(true)} className="button-link">Forgot password?</button></div>
            </div>
            {showModal && <ForgottenPasswordModal closeModal={closeModal}/>}
        </div>
    );
}