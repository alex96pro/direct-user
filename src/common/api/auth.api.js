import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { forgottenPasswordFailed, forgottenPasswordSuccess, loadingStatus, loginFailed } from '../actions/auth.actions';
import { signUpSuccess, signUpFailed, verifiedAccount, profile, changePasswordSuccess, changePasswordFailed } from '../actions/auth.actions';

export function signUpAPI(data) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/sign-up`,data);
            if(response.data.length){
                dispatch(signUpSuccess(`Signed up successfully! Please check your email: ${data.email} to verify your account`));
            }else{
                dispatch(signUpFailed('e-mail already in use'));
            }
        }catch(err){
            console.log(err);
        }
    }
}

export function logInAPI(data, loginSuccess) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/login`,data);
            if(response.status === 200){
                localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
                localStorage.setItem("USER_ID", response.data.userId);
                loginSuccess();
            }
        }catch(err){
            switch(err.response.status){
                case 401:
                    dispatch(loginFailed("Incorrect username or password"));
                    break;
                case 403:
                    dispatch(loginFailed("Please check your email and verify your account"));
                    break;
                default:
                    dispatch(loginFailed("Server error"));
            }
        }
    }
}

export function verifyAccountAPI(hashedUserId) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/verify-account`,{hashedUserId:hashedUserId});
            if(response.status === 200){
                dispatch(verifiedAccount());
            }
        }catch(err){
            console.log(err);
        }
    }
}

export function forgottenPasswordAPI(data) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/forgotten-password`,data);
            if(response.status === 200){
                dispatch(forgottenPasswordSuccess("We sent you a new password on your email !"));
            }
        }catch(err){
            if(err.response.status === 401){
                dispatch(forgottenPasswordFailed("Email doesn't exist"));
            }
        }
    }
}

export function profileAPI(unauthorised) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/auth/profile`,{headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            dispatch(profile(response.data));
        }catch(err){
            if(err.response.status === 401){
                dispatch(loadingStatus(false));
                unauthorised();
                alert("UNAUTHORIZED");
            }
        }
    }
}

export function changePasswordAPI(data) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/change-password`, {oldPassword: data.oldPassword, newPassword: data.newPassword}, 
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.status === 200){
                dispatch(changePasswordSuccess());
            }
        }catch(err){
            if(err.response.status === 400){
                dispatch(changePasswordFailed("Incorrect old password"));
            }
        }
    }
}