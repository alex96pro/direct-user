import { useForm } from 'react-hook-form';
import './forgotten-password.modal.scss';
import { useState, useEffect } from 'react';
import { forgottenPasswordAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../images/loader.gif';

export default function ForgottenPasswordModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const [modalOpacity, setModalOpacity] = useState(0);
    const {forgottenPasswordSuccess, forgottenPasswordMessage, loadingStatus} = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const submitEmal = (data) => {
        dispatch(forgottenPasswordAPI(data));
    }

    return (
        <div className="forgotten-password-modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                {!forgottenPasswordSuccess && 
                    <form onSubmit={handleSubmit(submitEmal)}>
                        <div className="label-accent-color">Please enter your e-mail address and we will send you a link to change your password</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <p className="message-danger">Email is required</p>}
                        <button type="submit" className="button-long">{loadingStatus? <img src={Loader} alt="Loading..." className="loader-small"></img> : "Send"}</button>
                    </form>
                }
                {forgottenPasswordMessage && <p className={forgottenPasswordSuccess? "message-success" : "message-danger"}>{forgottenPasswordMessage}</p>}
                {forgottenPasswordSuccess && <button onClick={() => props.closeModal()} className="button-long">OK</button>}
            </div>
        </div>
    );
}