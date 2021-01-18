import './sign-up.page.scss';
import { useForm } from 'react-hook-form';
import { signUpAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { signUpFailed } from '../../common/actions/auth.actions';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/nav-bar/nav-bar';
import SubmitButton from '../../components/common/submit-button';

export default function SignUp() {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {loadingStatus, signUpMessage, signUpSuccess} = useSelector(state => state.authentication);
    const history = useHistory();

    const signUp = (data) => {
        if(data.password !== data.retypePassword){
            dispatch(signUpFailed("Passwords don't match"));
        }else{
            dispatch(signUpAPI(data));
        }
    };

    return (
        <div className="sign-up">
            <NavBar loggedIn={false}/>
            {!signUpSuccess && 
            <div className="sign-up-container">
                <div className="form-container">
                <div className="sign-up-header">Create your new account</div>
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="label-accent-color">Email</div>
                        <input type="email" name="email" ref={register({required:true})}/>
                        {errors.email && <p className="message-danger">Email is required</p>}
                        <div className="label-accent-color">Password</div>
                        <input type="password" name="password" ref={register({required:true})}/>
                        {errors.password && <p className="message-danger">Password is required</p>}
                        <div className="label-accent-color">Retype password</div>
                        <input type="password" name="retypePassword" ref={register({required:true})}/>
                        {errors.retypePassword && <p className="message-danger">Password is required</p>}
                        <SubmitButton loadingStatus={loadingStatus} text="Sign Up"/>
                    </form>
                {signUpMessage && <p className="message-danger">{signUpMessage}</p>}
                </div>
                <p className="label-accent-color">Already have an account?<button type="button" onClick={() => history.push('/login')} className="button-link">Log in</button></p>
            </div>}
            {signUpMessage && signUpSuccess && <p className="label-accent-color">{signUpMessage}</p>}
        </div>
    );
};