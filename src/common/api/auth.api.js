import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus, profile } from '../actions/auth.actions';
import { putAdressesInFeed } from '../actions/feed.actions';

export function signUpAPI(data, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/sign-up`,data);
            if(response.data.length){
                dispatch(loadingStatus(false));
                message(`Signed up successfully! Please check your email: ${data.email} to verify your account`, true);
                localStorage.clear();
            }else{
                dispatch(loadingStatus(false));
                message('e-mail already in use');
            }
        }catch(err){
            dispatch(loadingStatus(false));
            console.log(err);
        }
    };
};

export function logInAPI(data, loginSuccess, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/auth/login?email=${data.email}&password=${data.password}`);
            if(response.status === 200){
                localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
                localStorage.setItem("USER_ID", response.data.userId);
                //localStorage.setItem("CURRENT_ADDRESS", JSON.stringify(response.data.addresses[0]));
                dispatch(loadingStatus(false));
                dispatch(putAdressesInFeed(response.data.addresses));
                loginSuccess();
            }
        }catch(err){
            dispatch(loadingStatus(false));
            switch(err.response.status){
                case 401:
                    message("Incorrect username or password");
                    break;
                case 403:
                    message("Please check your email and verify your account");
                    break;
                default:
                    message("Server error");
            }
        }
    };
};

export function verifyAccountAPI(hashedUserId) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/verify-account`,{hashedUserId:hashedUserId});
            if(response.status === 200){
                dispatch(loadingStatus(false));
            }
        }catch(err){
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }else{
                alert("SERVER ERROR");
            }
            console.log(err);
        }
    };
};

export function forgottenPasswordAPI(data, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/forgotten-password`,data);
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("We sent you a link for changing password on your email !", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            switch(err.response.status){
                case 401:
                    message("Email doesn't exist");
                    break;
                case 400:
                    message('We already sent you a link');
                    break;
                default:
                    message('Server error');
            }
        }
    };
};

export function newPasswordAPI(data, userId, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(false));
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/new-password`,{newPassword: data.newPassword, userId: userId});
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("Successfuly created new password", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }else{
                alert("SERVER ERROR");
            }
        }
    };
};

export function profileAPI(unauthorised) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/auth/profile`,{headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            dispatch(profile(response.data));
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
                unauthorised();
            }
        }
    };
};

export function changePasswordAPI(data, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/change-password`, {oldPassword: data.oldPassword, newPassword: data.newPassword}, 
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("Sucessfully changed your password", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 400){
                message("Incorrect old password");
            }
        }
    };
};