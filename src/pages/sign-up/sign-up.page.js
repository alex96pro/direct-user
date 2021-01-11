import { useForm } from 'react-hook-form';
import './sign-up.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import { signUpAPI } from '../../common/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { signUpFailed } from '../../common/actions/auth.actions';
import Loader from '../../images/loader.gif';
import { useHistory } from 'react-router-dom';

export default function SignUp() {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const {loadingStatus, signUpmessage, signUpSuccess} = useSelector(state => state.authentication);
    const history = useHistory();

    const signUp = (data) => {
        if(data.password !== data.retypePassword){
            dispatch(signUpFailed("Passwords don't match"));
        }else{
            dispatch(signUpAPI(data));
        }
    }

    return (
        <div className="sign-up">
            <NavBar loggedIn={false}/>
            {!signUpSuccess && <div>
                <div className="sign-up-header">Hungry ?</div>
                <div className="wrapper-container-big">
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
                        <div><button type="submit" className="button-long">Sign Up</button></div>
                    </form>
                </div></div>}
        <p className="label-accent-color">Already have an account?<button type="button" onClick={() => history.push('/login')} className="button-link">Log in</button></p>
        {signUpmessage && <p className={signUpSuccess ? "message-success" : "message-danger"}>{signUpmessage}</p>}
        {loadingStatus && <img src={Loader} className="loader" alt="Loading..."/>}
        </div>
    );
}