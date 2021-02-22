import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
            history.push({pathname:'/login', message:'Successfully changed your password !'});
            dispatch(logOut());
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
        <div className="modal">
            <div className="modal-underlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-header">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(handleChangePassword)}>
                        <div className="label-accent-color">Old password</div>
                        <input type="password" name="oldPassword" ref={register({required:true})}/>
                        {errors.oldPassword && <InputError text={'Old password is required'}/>}
                        {messageOldPassword && <InputError text={messageOldPassword}/>}

                        <div className="label-accent-color">New password</div>
                        <input type="password" name="newPassword" ref={register({required:true})}/>
                        {errors.newPassword && <InputError text={'New password is required'}/>}
                        {messageRetypePasswords && <InputError text={messageRetypePasswords}/>}

                        <div className="label-accent-color">Retype new password</div>
                        <input type="password" name="retypeNewPassword" ref={register({required:true})}/>
                        {errors.retypeNewPassword && <InputError text={'Retype new password'}/>}
                        {messageRetypePasswords && <InputError text={messageRetypePasswords}/>}

                        <SubmitButton loadingStatus={loadingStatus} text="Confirm"/>
                    </form>
                </div>
            </div>
        </div>
    );
};