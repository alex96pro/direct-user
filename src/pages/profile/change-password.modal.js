import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { changePasswordAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';
import SubmitButton from '../../components/submit-button';
import InputError from '../../components/input-error';

export default function ChangePasswordModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const [modalOpacity, setModalOpacity] = useState(0);
    const [messageOldPassword, setMessageOldPassword] = useState('');
    const [messageRetypePasswords, setMessageRetypePasswords] = useState('');
    const {loadingStatus} = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const setNewMessage = (newMessage, newSuccess = false) => {
        if(newSuccess){
            dispatch(logOut());
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_ID');
            history.push({pathname:'/login', message:'Successfully changed your password !'});
        }else{
            setMessageOldPassword(newMessage);
        }
    };

    const handleChangePassword = (data) => {
        if(data.newPassword !== data.retypeNewPassword){
            setMessageRetypePasswords("Passwords don't match");
        }else{
            setMessageRetypePasswords("");
            dispatch(changePasswordAPI(data, setNewMessage));
        }
    };

    return (
        <React.Fragment>
        <div className="modal-underlay" onClick={() => props.closeModal()}></div>
        <div className="modal" style={{opacity:modalOpacity}}>
            <div className="modal-header">
                <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
            </div>
            <div className="modal-body-vertical">
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="label">Old password</div>
                    <input type="password" name="oldPassword" ref={register({required:true})} className="app-input"/>
                    {errors.oldPassword && <InputError text={'Old password is required'}/>}
                    {messageOldPassword && <InputError text={messageOldPassword}/>}

                    <div className="label">New password</div>
                    <input type="password" name="newPassword" ref={register({required:true})} className="app-input"/>
                    {errors.newPassword && <InputError text={'New password is required'}/>}
                    {messageRetypePasswords && <InputError text={messageRetypePasswords}/>}

                    <div className="label">Retype new password</div>
                    <input type="password" name="retypeNewPassword" ref={register({required:true})} className="app-input"/>
                    {errors.retypeNewPassword && <InputError text={'Retype new password'}/>}
                    {messageRetypePasswords && <InputError text={messageRetypePasswords}/>}

                    <SubmitButton loadingStatus={loadingStatus} text="Confirm"/>
                </form>
            </div>
        </div>
        </React.Fragment>
    );
};