import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { forgottenPasswordAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../../components/submit-button';
import InputError from '../../components/input-error';

export default function ForgottenPasswordModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const [modalOpacity, setModalOpacity] = useState(0);
    const {loadingStatus} = useSelector(state => state.authentication);
    const [message, setMessage] = useState({text: '', success: false});
    const dispatch = useDispatch();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const setNewMessage = (newMessage, newSuccess = false) => {
        setMessage({text: newMessage, success: newSuccess});
    };

    const submitEmail = (data) => {
        dispatch(forgottenPasswordAPI(data, setNewMessage));
    };

    return (
        <React.Fragment>
        <div className="modal-underlay" onClick={() => props.closeModal()}></div>
        <div className="modal" style={{opacity:modalOpacity}}>
            <div className="modal-header">
                    <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
            </div>
            <div className="modal-body-vertical">
            {!message.success && 
                <form onSubmit={handleSubmit(submitEmail)}>
                    <div className="label">Please enter your e-mail address and we will send you a link to change your password</div>
                    <input type="email" name="email" ref={register({required:true})} className="app-input"/>
                    {errors.email && <InputError text={'Email is required'}/>}
                    <SubmitButton loadingStatus={loadingStatus} text="Send"/>
                </form>
            }
            {message.text && <p className={message.success? "message-success" : "message-danger"}>{message.text}</p>}
            {message.success && <button onClick={() => props.closeModal()} className="button-long">OK</button>}
            </div>
        </div>
        </React.Fragment>
    );
};