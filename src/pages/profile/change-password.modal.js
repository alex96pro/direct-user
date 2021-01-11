import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { changePasswordAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from '../../images/loader.gif';
import { logOut } from '../../common/actions/auth.actions';
import { changePasswordFailed } from '../../common/actions/auth.actions';

export default function ChangePasswordModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const [modalOpacity, setModalOpacity] = useState(0);
    const {loadingStatus,changePasswordMessage,changePasswordSuccess} = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    useEffect(() => {
        if(changePasswordSuccess){
            history.push({pathname:'/login', message:'Successfully changed your password !'});
            dispatch(logOut());
            localStorage.clear();
        }
    }, [changePasswordSuccess, history, dispatch]);

    const handleChangePassword = (data) => {
        if(data.newPassword !== data.retypeNewPassword){
            dispatch(changePasswordFailed("Passwords don't match"));
        }else{
            dispatch(changePasswordAPI(data));
        }
    }

    return (
        <div className="forgotten-password-modal">
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
                    
                    <button type="submit" className="button-long">{loadingStatus? <img src={Loader} alt="Loading..." className="loader-small"></img> : "Confirm"}</button>
                </form>
                {changePasswordMessage && <p className="message-danger">{changePasswordMessage}</p>}
            </div>
        </div>
    );
}