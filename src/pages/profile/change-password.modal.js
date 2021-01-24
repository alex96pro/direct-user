import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { changePasswordAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';
import SubmitButton from '../../components/common/submit-button';

export default function ChangePasswordModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const [modalOpacity, setModalOpacity] = useState(0);
    const [message, setMessage] = useState({text: '', success: false});
    const {loadingStatus} = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const setNewMessage = (newMessage, newSuccess = false) => {
        setMessage({text: newMessage, success: newSuccess});
    }

    useEffect(() => {
        if(message.success){
            history.push({pathname:'/login', message:'Successfully changed your password !'});
            dispatch(logOut());
        }
    }, [message.success, history, dispatch]);

    const handleChangePassword = (data) => {
        if(data.newPassword !== data.retypeNewPassword){
            setMessage({text: "Passwords don't match", success: false});
        }else{
            dispatch(changePasswordAPI(data, setNewMessage));
        }
    };

    return (
        <div className="modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="label-accent-color">Old password</div>
                    <input type="password" name="oldPassword" ref={register({required:true})}/>
                    {errors.oldPassword && <p className="message-danger">Old password is required</p>}

                    <div className="label-accent-color">New password</div>
                    <input type="password" name="newPassword" ref={register({required:true})}/>
                    {errors.newPassword && <p className="message-danger">New password is required</p>}

                    <div className="label-accent-color">Retype new password</div>
                    <input type="password" name="retypeNewPassword" ref={register({required:true})}/>
                    {errors.retypeNewPassword && <p className="message-danger">Retype new password</p>}

                    <SubmitButton loadingStatus={loadingStatus} text="Confirm"/>
                </form>
                {message.text && <p className="message-danger">{message.text}</p>}
            </div>
        </div>
    );
};